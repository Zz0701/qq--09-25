import React, { Component } from 'react'
import config from '../router/config'
import {Route} from 'react-router-dom'

export default class Routes extends Component {
    render() {
        console.log('路由',config)
        return (
            <React.Fragment>
                {
                config.map((item) => {
                    return (
                    <Route
                        exact
                        key={item.path}
                        path={item.path}
                        component={item.component}
                    ></Route>
                    )
                })
                }
            </React.Fragment>
        )
    }
}
