import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import component from './component'
import * as a from './actions'


const mapStateToProps = (state) => ({
    platform: state.map.platform,
    buildingUC: state.manager.common.buildingUC,
})

const mapDispatchToProps = (dispatch) => bindActionCreators(a, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(component)