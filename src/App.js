import React, { Component } from 'react'
import { Provider } from 'react-redux'

import store from './store'
// import JsonView from './jsonview/container'
import Map from './map/container'
import Manager from './manager/container'
import './App.css'


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className={`container-fluid`}>
          <div className={'row'}>
            <div className={'col-12 col-lg-7'}>
              <Map />
            </div>
            <div className={'col-12 col-lg-5'}>
              <Manager />
            </div>
          </div>
        </div>
      </Provider>
    )
  }
}

export default App
