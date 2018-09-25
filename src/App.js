import React, { Component } from 'react';
import 'antd-mobile/dist/antd-mobile.css'; 
import Routes from './views/routes'
import {
  BrowserRouter as Router,
  // NavLink,
  // Route
} from 'react-router-dom'

import {createStore} from 'redux'
import { Provider} from 'react-redux'
import reducers from './reducers/reducers'
let data = {
  hash: '',
  songList: []
}

let store = createStore(reducers,data);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
            <div className="content" style={{ background : '#fff'}}>
                <Routes  />
            </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

