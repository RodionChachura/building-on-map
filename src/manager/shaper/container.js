import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import component from './component'
import * as a from '../actions'


const mapStateToProps = (state) => ({
    buildingUC: state.manager.buildingUC,
})

const mapDispatchToProps = (dispatch) => bindActionCreators(a, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(component)