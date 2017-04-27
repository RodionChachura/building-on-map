import React, { Component } from 'react'
import { Provider } from 'react-redux';

import store from './store'
import JsonView from './jsonview/container'
import Manage from './map/container'
import Map from './map/container'

import './App.css'


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className={`container`}>
          <div className={'row'}>
            <div className={'col'}>
              <Map />
              <Manage />
            </div>
            <div className={'col'}>
              <JsonView />
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App
