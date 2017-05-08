// @flow

import component from './component'
import { connect } from 'react-redux';

import {Construction} from '../models/construction'
import * as s from './actions'

const mapStateToProps = (state) => {
  return {
    buildings: state.analyzer.buildings,
    construction: state.map.construction,
    zoomed: state.analyzer.zoomed,
    selected: state.analyzer.selected,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setConstruction: (construction: Construction) => dispatch(s.setConstruction(construction)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(component)