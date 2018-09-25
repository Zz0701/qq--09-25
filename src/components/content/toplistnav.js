import React, { Component } from 'react'
import { getRankList,getSingers,getPlist } from '../../server'

import './toplistnav.css'

import { navConfig} from '../../router/config'
import { withRouter } from 'react-router-dom'

class TopListNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: ['1', '2', '3'],
        singerData:[],
        singerListData:[],
        PlistData:[],
        tabs:navConfig,
        pageNum:0
    }
  }
  //换一批 跳转
  changeOnePage = (e) =>{
    this.setState({
      pageNum:this.state.pageNum+1,
    })
    console.log('更多歌单',this.state.pageNum)
  }
  componentDidMount() {
    //获取kugou排行
    setTimeout(() => {
      getRankList().then((o) => {
          this.setState({
              data:[],
              tabs:navConfig
          });
      })
    }, 100);

    //获取歌手分类
    setTimeout(() => {
      getSingers().then((o) => {
      console.log('singerData',o.data.data)
          this.setState({
              singerData: o.data.data
          });
      })
    }, 100);

     //全部推荐歌单
     setTimeout(() => {
      getPlist().then((o) => {
         // let o1 = JSON.parse(o.data.slice(18,-1))
         console.log('getPlist',o.data.data)
         var subArr = o.data.data.slice(0,6)
         console.log('subArr',subArr)
           this.setState({
            PlistData: subArr
           });
       })
     }, 100);
  }
  render() {
    return (
      <div>
          <div className="fenlei-content">
              <p className="recom-title">为你推荐歌单</p>
              <ul className="fenlei-List">
                { 
                  this.state.PlistData.map((item)=>{
                    return(
                      <li className="fenlei-Item">
                        <img className="fenlei-Image" src={item.imgurl.replace('{size}',240)} alt=""/>
                        <img className="bofang-gedan" src={require('../../img/bofang-gedanb.png')} alt=""/>
                        <img className="gengxin-time" src={require('../../img/gengxin-time.png')} alt=""/>
                        <span className="time">{item.publishtime.slice(0,10)}</span>
                        <span className="fenlei-Info">中国新说唱 第7期</span>
                        <span className="fenlei-Singer">{item.specialname}</span>
                      </li>
                    )
                  })
                }
              </ul>
          </div>
          <button
                  onClick={() => {
                    this.props.history.push('/plist')
                  }}
          >更多歌单</button>
    </div>
    )
  }
}

export default withRouter(TopListNav)


