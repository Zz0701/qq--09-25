import React, { Component } from 'react'
import { getPlist,getPlistInfo } from '../../server'
import { withRouter } from 'react-router-dom'
import { getSongMp3 } from '../../server/searchMp3'
import MP3 from '../common/Mp3'
import './plist.css'
//音乐歌单详情页
class PlistInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
          PlistInfoData:[],
          PlistData:[],
          mp3Url:'',
          isLoading: true,
        };
     }
    componentDidMount() {
        setTimeout(() => {
            let {match} = this.props;
                getPlistInfo({ specialid: match.params.id}).then(({data}) => {
                    if(data.data){
                        console.log('歌单信息Info',data.data.list.info)
                        this.setState({
                            PlistInfoData: data.data.list.info
                        });
                    }
                })
            }, 600);
        setTimeout(() => {
            console.log('mp3')
            getSongMp3('657EBFA003610234F88160D21C4AC3B1').then((o) => {
                console.log('mp33333',o.data.url)
                this.setState({
                    mp3Url:o.data.url
                });
            })
        }, 600);
        //拿到海报的数据
        setTimeout(() => {
            console.log(66087654332)
            getPlist().then((o) => {
                let index = 0
                if(o.data.data instanceof Array){
                    console.log(111111111111,o.data.data)
                    if(o.data.data.length){
                        index = o.data.data.findIndex(item => +this.props.location.pathname.slice(12) === item.specialid )
                        console.log('index',index)
                    }
                    
                    this.setState({
                        PlistData: o.data.data[index]
                    });
                    console.log(4444444444444,this.state.PlistData)
                }
            })
        }, 100);
    }
    render() {
        return (
            <div>
                <div className="Poster">
                    <p className="Album">专辑</p>
                    <div>
                        <img src={typeof(this.state.PlistData.imgurl) === 'string' ? this.state.PlistData.imgurl.replace('{size}',240) : ''} alt=""/>
                        <div className="Album-Info">
                            <span className="Album-Title">{this.state.PlistData.specialname}</span>
                            <span className="Album-Message">简介：{this.state.PlistData.intro}</span>
                        </div>
                    </div>
                </div>
                <div style={{ paddingTop:'6.5rem'}}>
                    <span style={{ fontSize:'20px',fontFamily:'微软雅黑',lineHeight:'40px'}}>全部播放</span>
                    {
                        this.state.PlistInfoData.map((item,index)=>{
                            return(
                                <div  style={{borderBottom: '1px dashed #ebebeb',padding:'0,0.4rem',}}>
                                    <div /*key={item.id}*/ 
                                        style={{
                                            paddingTop:'.4rem',
                                            lineHeight: '20px',
                                            color: '#000',
                                            fontSize: '18px'
                                        }}
                                        key={item.specialid+Math.random()} onClick={() => {
                                            this.props.history.push('/plist/list/' + item.specialid)
                                            console.log('播放',item.hash)
                                            // this.props.dispatch({ type: 'updateHash', hash: item.hash })
                                            // this.props.dispatch({ type: 'updateSongList', songList: this.props.songList})
                                    }}>{index+1}. {item.filename}
                                    </div>
                                    <p style={{
                                        lineHeight: '16px',
                                        color: '#666',
                                        fontSize: '16px',
                                        paddingLeft:'.6rem',
                                    }}>{item.filename}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <MP3 />
            </div>
        )
    }
}
export default withRouter(PlistInfo)