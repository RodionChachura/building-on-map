import { connect } from 'react-redux';
import store from '../store'

import component from './component'
import { fetchBuildings } from './actions'
import { urlForGetAllInsideSquare } from './utils'

const mapStateToProps = (state) => ({
    polygon: state.map.polygon,
    center: state.map.center,
    buildings: state.analyzer.buildings,
})

const fullFetchBuildings = (km) => {
     const center = store.getState().map.center
     return fetchBuildings(urlForGetAllInsideSquare(center, km))
}

const mapDispatchToProps = (dispatch) => ({
    fetch: (km = 1) => dispatch((fullFetchBuildings(km))),
})

export default connect(mapStateToProps, mapDispatchToProps)(component)