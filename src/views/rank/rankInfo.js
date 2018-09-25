import React, { Component } from 'react'
import './rank.css'
export default class RankInfo extends Component {
    static defaultProps = {
        songList:[]
      }
    render() {
        return (
            <div>
                {
                    this.props.songList.map((item,index)=>{
                        return(
                            <div className="Top-Rank">
                                <span className="Topindex">{index+1}</span>
                                <span className="Topsong">{item.songname.slice(0,8)}</span>
                                <span className="Topsinger">-{item.singername}</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
