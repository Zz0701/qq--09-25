import React, { Component } from 'react'
import { NavBar } from 'antd-mobile';

import { getSearch } from '../../server'
import { getSongMp3 } from '../../server/searchMp3'

import MP3 from '../common/Mp3.js'
import './search.css'

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            SearchResultsData: ['1', '2', '3'],
            value:'',//输入框的值
            MusicURL: '',
            MusicName:'',
            MusicImage:''
        }
    }
    //播放器功能
    getMP3Data =(hash) =>{
        getSongMp3(hash).then((o) =>{
           console.log(5000,o)//拿到播放来源 配置的路由
           this.setState({
               MusicURL: o.data.url,
               MusicName:o.data.fileName,
               MusicImage:o.data.imgUrl
           })
           console.log('播放地址',this.state.MusicURL)
           console.log('正在播放歌曲名字',this.state.MusicName)
        })
   }
   //搜索功能
    GetSearchResults = (val) =>{
        console.log('998877',val)
        setTimeout(() => {
            getSearch(val).then((o) => {
            if(typeof(o.data) === 'string' ){
                let o1 = JSON.parse(o.data.slice(1,-1))
                let arr = o1.data.info
                console.log(446677,arr)
                this.setState({
                    SearchResultsData:arr
                });
            }
            })
        }, 1000);
    }
    // 在输入框输入的时候更新value值
    updateValue = (e) => {
        // 异步更新
        this.setState({
            value: e.target.value
        })
        this.GetSearchResults(this.state.value)
        console.log(4447777,this.state.value)//时时监控输入框的值
    }
    componentDidMount() {
        //执行输入之后搜索发送ajax
        this.GetSearchResults()//输入之后执行ajax函数
    }
    render() {
        return (
            <div class="top">
                <NavBar
                    mode="dark"
                    leftContent=""
                ></NavBar>
                <input 
                    type="text" 
                    className="edit" 
                    vauleChange={this.state.value}
                    onChange={this.updateValue}
                    onDoubleClick={() => {
                        this.updateValue()                    
                    }}
                />
                <ul class="Search-List">
                   { 
                        this.state.SearchResultsData.map((item) =>{
                            return(
                            <li 
                                class="Search-Results"
                                onClick={() => {
                                    console.log('歌曲哈希',item.hash)
                                    this.getMP3Data(item.hash)             
                                }}
                            >{item.filename}</li>
                            )
                        })
                    }
                </ul>
                <MP3 />
            </div>
        )
    }
}
