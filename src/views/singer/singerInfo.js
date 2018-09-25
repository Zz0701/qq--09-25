import React, { Component } from 'react'

import { getSingerInfo } from '../../server'
import { getSongMp3,getSongWord } from '../../server/searchMp3'

import MP3 from '../common/Mp3.js'
import './singer.css'

export default class SingerInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singerAllSongs:[],//用来放歌曲列表中的歌曲
            singerInfoData:[],//选择的歌手的歌曲
            MusicURL:'',//正在播放的歌曲地址
            MusicName:'',//正在播放的歌曲名字
            MusicImage:'',//播放的歌曲海报
            isLoading: true,//在数据请求回来之前loading图
            SongArr:[],//请求回来歌词数据
            SonglistNew:[],//歌词一般显示的数据
            isShow:false,//遮罩层不显示
            currentTime:'',//当前歌曲播放进度
            SongShow:'',//正在唱到的歌词
            isPlay:false,//控制播放或者暂停
            PlayIndex:'',//当前播放列表里的第几个
        };
     }
     //点击上一首和下一首（父级接受子级传来的数据）
     HandleIndex=(index) =>{
        console.log('子级传父级',index)
        this.setState({
            PlayIndex:index
        })
        if(this.state.PlayIndex !==''){
            let FileName = this.state.singerAllSongs[this.state.PlayIndex].filename
            let newhash = this.state.singerAllSongs[this.state.PlayIndex].hash
            this.UpdateSongList({ hash : newhash, keyword:FileName })
         }
     }
    //点击列表任一首
    getMP3Data =(obj) =>{
        this.UpdateSongList(obj)//更新歌曲和歌词
    }
    //更新歌曲歌曲和歌词
    UpdateSongList=(obj) =>{
        getSongMp3(obj.hash).then((o) =>{
            console.log(5000,o)//拿到播放来源 配置的路由
            this.setState({
                MusicURL: o.data.url,
                MusicName:o.data.fileName,
                MusicImage:o.data.imgUrl
            })
         })
        getSongWord(obj).then((o) =>{
            let SongArr = o.data.split('\n')
            let ProgressTimeArr = [];//数组存放每句歌词对应的事件进度
            // console.log('SongArr',SongArr)
            SongArr.map((item) =>{
                ProgressTimeArr.push(parseInt(item.slice(1,3),10)*60+parseInt(item.slice(4,6),10)+parseInt(item.slice(7,9),10)/100)
                ProgressTimeArr.shift()
            }) 
            this.setState({
                SongArr:SongArr,//不变的数组（歌词）
                ProgressTimeArr:ProgressTimeArr//不变的数组（歌词对应的时间）
            })
        })
    }
    //歌曲播放实时监控
    getCurrentTime=() =>{
        const audio = document.getElementById('audio');
        let LastTime = audio.currentTime
        let New = [];
        this.state.SongArr.map((item) =>{
            New.push(item)
        })
        
        let index = this.state.ProgressTimeArr.findIndex((item) => parseInt(item,10) > parseInt(audio.currentTime,10))
        let SongShow = New[index]
        if(index !== -1 && index !== ''){
            New.splice(this.state.ProgressTimeArr.findIndex((item) => parseInt(item,10) > parseInt(LastTime,10)) ,1)
        }
        
        this.setState({
            currentTime: audio.currentTime,
            SonglistNew: New,
            SongShow:SongShow
        })
        //思路：更新一下SonglistNew的值
    }
   
    //歌手详情页面
    componentDidMount() {
        setTimeout(() => {
            let {match} = this.props;
            getSingerInfo({ singerid: match.params.id}).then(({data}) => {
                if(data.data){
                    // console.log('歌手信息',data.info)
                    console.log('歌手歌曲',data.data)
                    this.setState({
                        singerInfoData: data.info,//对象
                        singerAllSongs: data.data//数组
                    });
                }
            })
        }, 100);
    }
    render() {
        return (
            <div key={Math.random()}>
                <div className="header">
                <img className="gedan-Background" src={typeof(this.state.singerInfoData.imgurl) === 'string' ? this.state.singerInfoData.imgurl.replace('{size}',240) : ''} alt=""/>
                    <div  className="gedan-head">
                        <img className="fixed-Background" src={typeof(this.state.singerInfoData.imgurl) === 'string' ? this.state.singerInfoData.imgurl.replace('{size}',240) : ''} alt=""/>
                        <img className="gedan-fanhui" src={require('./image/fanhui.png')} alt=""/>
                        <span className="gedan">歌单</span>
                        <img className="gedan-more" src={require('./image/more.png')} alt=""/>
                    </div>
                    <div className="singer-infor">
                        <div className="gedan-Img">
                            <img src={typeof(this.state.singerInfoData.imgurl) === 'string' ? this.state.singerInfoData.imgurl.replace('{size}',240) : ''} alt=""/>
                        </div>
                        <div className="gedan-Info">
                            <p className="gedan-Info-a">歌手：{this.state.singerInfoData.singername}</p>
                        </div>
                    </div>
                    <div className="gedan-pinglun">
                        <img className="shoucang" src={require('./image/shoucang.png')} alt=""/>
                        <span className="shou-Cang">31</span>
                        <img className="pinglun" src={require('./image/pinglun.png')} alt=""/>
                        <span className="ping-Lun">评论</span>
                        <img className="fenxiang" src={require('./image/fenxiang.png')} alt=""/>
                        <span className="fen-Xiang">分享</span>
                    </div>
                </div>
                <section className="MusicAllSelect">
                    <img className="Music-All-Play" src={require('./image/bofang.png')} alt="" />
                    <span className="Music-All">全部播放(34)</span>
                    <img className="Music-Download" src={require('./image/xiazai.png')} alt="" />
                    <img className="Music-SelecAll" src={require('./image/duoxuan.png')} alt="" />
                </section>
                <ul  className="SongList">
                    {
                        this.state.singerAllSongs.map((item,index)=>{
                            return(
                                <li className="SongListItem"
                                    key={item.audio_id+Math.random()} 
                                    onClick={() => {
                                        console.log('歌曲hash',item.hash)
                                        this.getMP3Data({ hash : item.hash, keyword:item.filename })
                                }}>
                                    <span className="Music-Number">{index+1}</span>
                                    <p>
                                        <span className="Song-Name">{item.filename}</span>
                                        <span className="Singer-Name">大包子Daboss</span>
                                    </p>
                                    <img src={require('./image/tanchukuang.png')} alt=""/>
                                </li>
                            )
                        })
                    }   
                </ul>
                <MP3  getCurrentTime={this.getCurrentTime}
                      MusicURL={this.state.MusicURL}
                      MusicImage={this.state.MusicImage.replace('{size}',240)}
                      MusicName={this.state.MusicName}
                      SonglistNew={this.state.SonglistNew}
                      MusicName={this.state.MusicName}
                      SongShow={this.state.SongShow}
                      singerAllSongs={this.state.singerAllSongs}//放歌曲列表中的歌曲
                      HandleIndex={this.HandleIndex}
                />              
            </div>
        )
    }
}
