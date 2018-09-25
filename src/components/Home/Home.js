import React, { Component } from 'react'
// import GoBack from './goback'

import Header from '../../components/Home/header'
import Search from '../../views/search/search'

import {withRouter} from 'react-router-dom'
import { navConfig } from '../../router/config'


class Home extends Component {
  render() {
    let HeadTrue = this.props.location.pathname === '/' ? true : false
    let SearchTrue = this.props.location.pathname === '/search' ? true : false
    console.log(this.props.location.pathname)
    return (
      <div className="Home">
        {
        //   HeadTrue ? <Header  /> : ''
        }
        {
        //   SearchTrue ? <Search  /> : ''
        }
      </div>
    )
  }
}

export default withRouter(Home)
