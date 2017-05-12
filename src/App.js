import React, { Component } from 'react'
import {Provider} from 'react-redux'
import {Row, Container} from 'reactstrap'

import store from './store'
// import JsonView from './jsonview/container'
import Map from './map/container'
import Manager from './manager/container'
import JsonView from './jsonview/container'
import './App.css'


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container fluid={true}>
          <Row>
            <div className={'col-12 col-lg-7'}>
              <Map />
            </div>
            <div className={'col-12 col-lg-5'}>
              <Manager />
            </div>
          </Row>
          <Row className={'justify-content-center'}>
            <JsonView />
          </Row>
        </Container>
      </Provider>
    )
  }
}

export default App
