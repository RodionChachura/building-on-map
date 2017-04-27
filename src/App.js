import React, { Component } from 'react'
import { Provider } from 'react-redux';

import store from './store'
import JsonView from './jsonview/container'
import Manage from './map/container'
import Map from './map/container'


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Map />
          <Manage />
          <JsonView />
        </div>
      </Provider>
    );
  }
}

export default App
