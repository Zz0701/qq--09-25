import React, { Component } from 'react'
import { getPlist } from '../../server'
import './plist.css'


export default class PList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isLoading: true,
          PlistData:[]
        };
     }
    componentDidMount() {
        setTimeout(() => {
            console.log(3333336666)
            getPlist().then((o) => {
                console.log(o)
                if(o.data.data instanceof Array){
                    console.log('getPlist',o.data.data)
                    this.setState({
                        PlistData: o.data.data
                    });
                }
            })
        }, 100);
    }
    render() {
        return (
            <div>
                <div className="fenlei-head">
                    <img src={require('../../img/fenlei-fanhui.png')} className="fenlei-fanhui" alt="" />
                    <span className="fenlei-newSong">新歌</span>
                    <span className="fenlei-movie">影视</span>
                </div>
                <div className="fenlei-Nav">
                    <span>推荐</span>
                    <span>内地</span>
                    <span>港台</span>
                    <span>欧美</span>
                    <span>日本</span>
                </div>
                <section className="fenlei-content">
                    <ul className="fenlei-List">
                    { 
                        this.state.PlistData.map((item)=>{
                            return(
                                <li key={item.specialid}
                                    className="fenlei-Item"
                                    onClick={() => {
                                        this.props.history.push('/plist/list/' + item.specialid)
                                    }}
                                >
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
                </section>
                <p style={{fontSize:'25px',color:'#838383',textAlign:'center'}}>-我是有底线的-</p>
            </div>
        )
    }
}

