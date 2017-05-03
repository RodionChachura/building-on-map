import { connect } from 'react-redux';

import component from './component'
import { fetchBuildings } from './actions'

const mapStateToProps = (state) => ({
    polygon: state.map.polygon,
    center: state.map.center,
    buildings: state.analyzer.buildings,
})

const mapDispatchToProps = (dispatch) => ({
    fetch: () => dispatch(fetchBuildings()),
})

export default connect(mapStateToProps, mapDispatchToProps)(component)