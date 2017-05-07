// @flow

import component from './components/map'
import { connect } from 'react-redux';

import type {Nodes} from '../models'
import {Node} from '../models'
import * as s from './actions'

const mapStateToProps = (state) => {
  return {
    buildings: state.analyzer.buildings,
    polygon: state.map.polygon,
    building: state.map.building
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPolygon: (coordinates: Nodes) => dispatch(s.setPolygon(coordinates)),
    setEnters: (enters: Array<Nodes>) => dispatch(s.setEnters(enters)),
    setExits: (exits: Array<Nodes>) => dispatch(s.setExits(exits)), 
    setCenter: (center: Node) => dispatch(s.setCenter(center)),  
    setBuilding: (polygon: Nodes) => dispatch(s.setBuilding(polygon)),  
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(component)