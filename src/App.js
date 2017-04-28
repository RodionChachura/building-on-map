import React, { Component } from 'react'
import { Provider } from 'react-redux';

import store from './store'
import JsonView from './jsonview/container'
import Manage from './manage/container'
import Map from './map/container'

import './App.css'


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className={`container`}>
          <div className={'row'}>
            <div className={'col-8'}>
              <Map />
              <Manage />
            </div>
            <div className={'col-4'}>
              <JsonView />
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App
