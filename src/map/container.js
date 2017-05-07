// @flow

import component from './components/map'
import { connect } from 'react-redux';

import type {Nodes} from '../models'
import {Node} from '../models'
import * as s from './actions'

const mapStateToProps = (state) => {
  return {
    buildings: state.analyzer.buildings
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPolygon: (coordinates: Nodes) => dispatch(s.setPolygon(coordinates)),
    setEnters: (enters: Array<Nodes>) => dispatch(s.setEnters(enters)),
    setExits: (exits: Array<Nodes>) => dispatch(s.setExits(exits)), 
    setCenter: (center: Node) => dispatch(s.setCenter(center)),  
    setSelected: (polygon: Nodes) => dispatch(s.setSelected(polygon)),  
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(component)