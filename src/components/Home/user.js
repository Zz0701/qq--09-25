import React, { Component } from 'react'

import './header.css'

export default class User extends Component {
    render() {
        return (
            <div>
                <div class="head-Wode">
                    <div class="head-box">
                        <span class="wode" 
                             onClick={() => {
                                this.props.history.push('/user')
                              }}
                        >我的</span>
                        <span class="yinyueguan"
                            onClick={() => {
                                this.props.history.push('/')
                            }}
                        >音乐馆</span>
                        <span class="faxian">发现</span>
                    </div>
                    <img src={require("../../img/saoyisao.png")} class="saoyisao" alt="" />
                    <img src={require("../../img/denglu.png")}  class="denglu"  alt="" />
                    <div class="head-search">
                        <img src={require("../../img/sousuo.png")} class="search-ico"  alt=""
                            onClick={() => {
                        this.props.history.push('/search')
                    }} />
                    </div>
                </div>
                <div class="head-login">
                    <img src={require("../../img/user.png")} class="login-user"   alt="" />
                    <span  class="Login">立即登陆，资产云同步</span>
                </div>
                <ul class="mycontent">
                    <li class="My-All">
                        <img src={require("../../img/ico-1.png")}   alt=""  />
                        <span  class="myNum">11</span>
                    </li>
                    <li class="My-download">
                        <img src={require("../../img/ico-2.png")}  alt=""  />
                        <span  class="myNum">3</span>
                    </li>
                    <li class="bofang-Recent">
                        <img src={require("../../img/ico-3.png")}  alt="" />
                        <span  class="myNum">7</span>
                    </li>
                </ul>
                <ul class="mycontent">
                    <li class="My-like">
                        <img src={require("../../img/ico-4.png")}  alt="" />
                        <span class="myNum">6</span>
                    </li>
                    <li  class="My-Purchase">
                        <img src={require("../../img/ico-5.png")}  alt="" />
                        <span class="myNum">9</span>
                    </li>
                    <li  class="Runing-vedio">
                        <img src={require("../../img/ico-6.png")}   alt=""/>
                        <span class="myNum">1</span>
                    </li>
                </ul>
                <div class="shoucang-gedan">收藏歌单|自建歌单</div>
                <img src={require("../../img/xinjian-gedan.png")}  class="tianjia-gedan"  alt=""/>
                <img src={require("../../img/more-gedan.png")} class="more-gedan"  alt="" />
                <div>
                    <img src={require("../../img/wode-gedan.png")}  class="xinjian-gedan"  alt="" />
                    <span class="xinjian-gedan">新建歌单</span>
                </div>
            </div>
        )
    }
}