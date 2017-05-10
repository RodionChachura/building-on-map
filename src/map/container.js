// @flow

import component from './component'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import * as a from './actions'

const mapStateToProps = (state) => ({
    buildings: state.analyzer.buildings,
    buildingUC: state.map.buildingUC,
    enters: state.map.enters,
    exits: state.map.exits,
    platform: state.map.platform,
    completed: state.map.completed,
    zoomed: state.analyzer.zoomed,
    selected: state.analyzer.selected,
})

const mapDispatchToProps = (dispatch) => bindActionCreators(a, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(component)