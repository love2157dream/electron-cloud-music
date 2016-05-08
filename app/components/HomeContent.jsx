import React, { Component } from 'react';
import { recommendResource } from '../server';
import Spinner from './Spinner.jsx';
import MiniAlbumCard from './MiniAlbumCard.jsx';

export default class HomeContent extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      recommendState: 'nouser',
      recommend: null,
    }
  }

  componentWillReceiveProps(props) {
    if (props.user == this.props.user) {
      return;
    }
    if (props.user.loginState == 'logged_in') {
      this.setState({
        recommendState: 'fetching',
      });
      recommendResource().then(res => {
        this.setState({
          recommendState: 'get',
          recommend: res.recommend,
        });
        console.log('REEE', res);
      });
    } else {
      this.setState({
        recommendState: 'nouser',
      });
    }
  }

  render() {
    return (
      <div
        style={{
          display: this.props.display ? this.props.display : null,
        }} 
        className="content" id="home-content">
        <div className="content__main">
          <section className="recommend">
            <div className="content__headinfo">
              <p>推荐歌单</p>
            </div>
              {
                this.state.recommendState=='fetching' ? <Spinner /> :
                this.state.recommendState=='get' ? 
                (<div className="recommend__main">
                  {
                    this.state.recommend.map( songlist => 
                      <MiniAlbumCard
                        data={songlist} 
                        push={this.props.actions.push}
                        fetchsonglistdetail={this.props.actions.fetchsonglistdetail}
                        />                                     
                    )
                  }
                 </div>) :
                (<div className="recommend__main">
                 </div>)
              }
          </section>
        </div>
      </div>
    );
  }
}
