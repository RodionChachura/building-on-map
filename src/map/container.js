// @flow

import component from './component'
import { connect } from 'react-redux'

import * as r from './redux'
import type {Nodes} from '../models/common'

const mapStateToProps = (state) => {
  return {
    buildings: state.analyzer.buildings,
    buildingUC: state.map.buildingUC,
    enters: state.map.enters,
    exits: state.map.exits,
    platform: state.map.platform,
    completed: state.map.completed,
    zoomed: state.analyzer.zoomed,
    selected: state.analyzer.selected,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPlatform: (platform: Nodes) => dispatch(r.setPlatform(platform)),
    setEnters: (enters: Array<Nodes>) => dispatch(r.setEnters(enters)),
    setExits: (exits: Array<Nodes>) => dispatch(r.setExits(exits)),
    setBuildingUC: (buildingUC: Nodes) => dispatch(r.setBuildingUC(buildingUC)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(component)