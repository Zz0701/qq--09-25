import React, { Component } from 'react'
import { Router, Route, Link } from 'react-router'
import { getSingerList } from '../../server'

import SingerInfo from './singerInfo'
import './singer.css'

export default class Singer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoading: true,
          singerListData:[]
        };
     }
    componentDidMount() {
        //全部歌手列表
        setTimeout(() => {
           getSingerList().then((o) => {
           console.log('singerListData',o.data.data)
             this.setState({
              singerListData: o.data.data
             });
         })
       }, 10);
    }
    render() {
        return (
            <div>
               <div className="fenlei-head">
                    <img src={require('../../img/fenlei-fanhui.png')} className="fenlei-fanhui" alt="" />
                    <span className="fenlei-newSong">歌手</span>
                    <span className="fenlei-movie">我的</span>
                </div>
                <ul class="classfiy-Singer">
                    <li class="classfiy">全部
                        <span>内地</span>
                        <span>港台</span>
                        <span>欧美</span>
                        <span>日本</span>
                        <span>韩国</span>
                        <span>其他</span>
                    </li>
                    <li class="classfiy">全部
                        <span>男</span>
                        <span>女</span>
                        <span>组合</span>
                    </li>
                    <li class="classfiy">全部
                        <span>流行</span>
                        <span>嘻哈</span>
                        <span>摇滚</span>
                        <span>民谣</span>
                        <span>R&B</span>
                    </li>
                </ul>
                {
                    this.state.singerListData.map((item)=>{
                        return(
                            <div key={item.classid} style={{ padding: '5px 5px' }}
                                onClick={() => {
                                this.props.history.push('/singer/info/' + item.singerid)
                            }}>
                                <div 
                                    class="Border-Bottom" 
                                    style={{display: '-webkit-box',padding: '15px 0'}}
                                    >
                                    <img 
                                        style={{ 
                                            height: '6.6rem',
                                            marginLeft: '.5rem', 
                                            marginRight: '.5rem',
                                            borderRadius:'3.3rem'
                                        }} 
                                        src={item.imgurl.replace('{size}',240)} 
                                        alt="" 
                                    />
                                    <div  style={{ 
                                            fontSize: '1.77rem',
                                            marginTop:'2rem',
                                            marginLeft:'2rem',
                                        }} >{item.singername}</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
