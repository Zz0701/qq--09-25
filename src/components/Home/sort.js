import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { getSingers } from '../../server'
import { navConfig} from '../../router/config'
import './sort.css'

class Sort extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ['1', '2', '3'],
            tabs:navConfig
        }
      }
      componentDidMount() {
        setTimeout(() => {
         getSingers().then((o) => {
            // let o1 = JSON.parse(o.data.slice(18,-1))
            console.log('酷狗singer',o)
              this.setState({
                //   data: o1.data.topList,
                //   tabs:navConfig
              });
          })
        }, 100);
      }
    render() {
        return (
            <div id="sort">
                <a to="/singer" className="sortList" onClick={() => {
                    this.props.history.push(`/singer`)
                   }}>
                    <img className="icon-geshou"   src={require("../../img/Musicico-1.png")} alt=""/>
                </a>
                <a to="/rank" className="sortList" onClick={() => {
                    this.props.history.push(`/rank`)
                   }}>
                    <img className="icon-paixingbang"   src={require("../../img/musicico2.png")} alt=""/>
                </a>
                <a to="/plist" className="sortList" onClick={() => {
                    this.props.history.push(`/plist`)
                   }}>
                    <img className="iconfont icon-fenlei"   src={require("../../img/musicico-3.png")} alt=""/>
                </a>
                <a to="/broadcast" className="sortList" onClick={() => {
                    this.props.history.push(`/broadcast`)
                   }}>
                    <img className="iconfont icon-xinhaota"   src={require("../../img/musicico-4.png")} alt=""/>
                </a>
                <a to="/video" className="sortList" onClick={() => {
                    this.props.history.push(`/video`)
                   }}>
                    <img className="iconfont icon-shipintianchong"  src={require("../../img/musicico-5.png")} alt="" />
                </a>
            </div>
        )
    }
}
export default withRouter(Sort)