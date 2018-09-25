import React, { Component } from 'react'

import Sort from './sort'
import Banner from './banner'
import TopList from '../../components/content/topList';


import './header.css'

export default class Header extends Component {
    state = {
        collapsed: false,
      }
    
      toggleCollapsed = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      }
    
    render() {
        return (
            <div>
                <div className="head-Wode">
                    <div className="head-box">
                        <span className="wode" 
                             onClick={() => {
                                this.props.history.push('/user')
                              }}
                        >我的</span>
                        <span className="yinyueguan"
                            onClick={() => {
                                this.props.history.push('./header')
                            }}
                        >音乐馆</span>
                        <span className="faxian">发现</span>
                    </div>
                    <img src={require("../../img/saoyisao.png")} className="saoyisao" alt="" />
                    <img src={require("../../img/denglu.png")}  className="denglu"  alt=""  />
                    <div className="head-search">
                        <img src={require("../../img/sousuo.png")} className="search-ico"   alt="" 
                            onClick={() => {
                        this.props.history.push('/search')
                    }} />
                    </div>
                </div>
                <Banner />
                <Sort />
                <TopList />
            </div>
        )
    }
}