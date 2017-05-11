import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import component from './component'
import * as a from './actions'
import * as commonA from '../actions'


const mapStateToProps = (state) => ({
    platform: state.map.platform,
    map: state.map.map,
    drawingManager: state.map.drawingManager,
    buildings: state.manager.analyzer.buildings,
    loading: state.manager.analyzer.loading,
    buildingUC: state.manager.common.buildingUC,
})

const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators(a, dispatch),
    ...bindActionCreators(commonA, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(component)