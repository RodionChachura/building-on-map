import React, { Component } from 'react'
import { Provider } from 'react-redux';

import store from './store'
import JsonView from './jsonview/container'
import Map from './map/container'

import './App.css'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className={`container`}>
          <div className={'row'}>
            <div className={'col-12 col-lg-8'}>
              <Map />
            </div>
            <div className={'col-12 col-lg-4'}>
              <JsonView />
            </div>
          </div>
        </div>
      </Provider>
    );
  }
}

export default App
