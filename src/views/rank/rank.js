import React, { Component } from 'react'
// import {  Picker } from 'antd-mobile';
// import ReactDOM from 'react-dom'
import RankInfo from './rankInfo'

import { getRankData } from '../../server'
import { navConfig} from '../../router/config'

import './rank.css'
  
  class Rank extends Component {
    constructor(props) {
      super(props);
      this.state = {
        rankData:[],
        isLoading: true,
      };
    }
    componentDidMount() {
        // you can scroll to the specified position
        // setTimeout(() => this.lv.scrollTo(0, 120), 800);
        // simulate initial Ajax
        //获取排行RankData
        setTimeout(() => {
            getRankData().then((o) => {
                let o1 = JSON.parse(o.data.slice(18,-1))
                console.log('rankData',o1.data.topList)
                  this.setState({
                      rankData: o1.data.topList,
                      tabs:navConfig
                  });
              })
        }, 100);
    }
      render() {
        return (
            <div>
                <div className="fenlei-head">
                    <img src={require('../../img/fenlei-fanhui.png')} className="fenlei-fanhui" alt="" />
                    <span className="fenlei-newSong">排行</span>
                    <span className="fenlei-movie">我的</span>
                </div>
                <ul className="RankList">
                    {
                        this.state.rankData.map((item)=>{
                            return(
                                <li key={item.id} className="RankItem">
                                        <span className="Classfy-Name">{item.topTitle}</span>
                                        <div className="Classfy-Rank">
                                            <span className="Classfy-RankImg">
                                                <img   src={item.picUrl} alt=""  />
                                            </span>
                                            <span className="Classfy-RankSong">
                                                <RankInfo  className="TopRanking" songList={item.songList}   />
                                            </span>
                                        </div>
                                </li>
                            )
                        })
                    }
                </ul>
         </div>
        )
    }
}
 export default Rank                   