import React, { Component } from 'react'
import './mp3.css'

export default class MP3 extends Component{
    constructor(props) {
        super(props);
        this.state = {
          isLoading: true,//在数据请求回来之前loading图
          SongArr:[],//请求回来歌词数据
          SonglistNew:[],//歌词一般显示的数据
          isShow:false,//遮罩层不显示
          currentTime:'',//当前歌曲播放进度
          ProgressTimeArr:[],//歌词进度时间数组
          SongShow:'',//正在唱到的歌词
          isPlay:false,//控制播放或者暂停
        };
     }
    

    //遮罩层显示隐藏
    ShowOrHide = () =>{
        console.log(7766655)
        if(!this.state.isShow){
            this.setState({
                isShow: true
            })
        }else{
            this.setState({
                isShow: false
            })
        }
    }
    //控制播放和暂停
    playOrPause =() => {
        const audio = document.getElementById('audio');
        if (audio.paused){
          audio.play();
        }else{
          audio.pause();
        }
        this.setState({
          isPlay: !this.state.isPlay
        })
    }
    //前进
    nextSong=() =>{
        let index=this.props.singerAllSongs.findIndex((item) => item.filename === this.props.MusicName)
        index++;
        console.log(index)
        this.props.HandleIndex(index);//子级传给父级
    }
    //回退
    prevSong=() =>{
        let index=this.props.singerAllSongs.findIndex((item) => item.filename === this.props.MusicName)
        index--;
        console.log(index)
        this.props.HandleIndex(index);//子级传给父级
    }

    render() {
        return (
            <div className="Player-Mp3">
                <div className="play-bottom">
                    <audio 
                        id="audio"
                        onTimeUpdate={this.props.getCurrentTime}
                        ref={this.audio}
                        autoPlay src={this.props.MusicURL}
                    ></audio>

                    <div className="play-left">
                        <p className="Singer-Image">
                            <img  src={this.props.MusicImage}  alt=""  onClick={this.ShowOrHide} />
                        </p>
                        <p className="SingerName">
                            <span>{this.props.MusicName}</span>
                        </p>
                    </div>
                    <div className="play-right">
                        <div className="iconfont  icon-houtui"
                            onClick={this.prevSong}
                        ></div>
                        <div className="iconfont icon-bofang"
                            onClick={this.playOrPause}
                        ></div>
                        <div className="iconfont  icon-qianjin"
                            onClick={this.nextSong}
                        ></div>
                    </div>
                </div>
              
                <div className="mark" style={{ display:this.state.isShow ? 'block' : 'none' }}>
                    <img className="Background" src={this.props.MusicImage} alt="" />
                    <ul className="Song-List">
                        {
                           this.props.SonglistNew.map((item) =>{
                               return(
                                <li className="Song-Item">{item.slice(10)}</li>
                               )
                           }) 
                        }
                    </ul>
                    <p  className="Song-Words" style={{ color:'#fff',textAlign:'center',fontSize:'20px'}}>{this.props.SongShow}</p>
                    <div className="Progress-bar"></div>
                    <div className="Progress-circle"></div>
                </div> 
            </div>
        )
    }
}
