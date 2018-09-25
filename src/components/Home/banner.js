import React, { Component } from 'react'
import { Carousel, WingBlank } from 'antd-mobile';

import { getBanner } from '../../server'
import './banner.css'
import { withRouter } from 'react-router-dom'

class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ['1', '2', '3'],
            imgHeight: 176,
        }
    }
    componentDidMount() {
      // simulate img loading
      setTimeout(() => {
        getBanner().then((data) => {
            console.log(111111,data.data.data.slider)
            this.setState({
                data: data.data.data.slider,
            });
        }) 
      }, 100);
      
    }
    render() {
      return (
        <WingBlank>
          <Carousel
            autoplay={true}
            infinite
          >
            {this.state.data.map((item, index) => (
              <span
                key={item.id}
                style={{ display: 'inline-block', width: '100%', height: 'auto'}}
              >
                <img
                  src={item.picUrl ? item.picUrl : require('../../img/loading.gif')}
                  alt=""
                  style={{ width: '100%', verticalAlign: 'top' }}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  }}
                /> 
              </span>
            ))}
          </Carousel>
        </WingBlank> 
       
      );
    }
}

export default withRouter(Banner);