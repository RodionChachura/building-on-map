// @flow

import component from './component'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import * as a from './actions'
import type {State} from '../rootReducer'

const mapStateToProps = (state: State) => ({
    enters: state.map.enters,
    exits: state.map.exits,
    platform: state.map.platform,
    completed: state.map.completed,
})

const mapDispatchToProps = (dispatch) => bindActionCreators(a, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(component)