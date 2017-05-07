import { connect } from 'react-redux'
import store from '../store'

import component from './component'
import * as a from './actions'
import {Building} from './models'
import { urlForGetAllInsideSquare } from '../utils/map'

const mapStateToProps = (state) => ({
    polygon: state.map.polygon,
    center: state.map.center,
    buildings: state.analyzer.buildings,
})

const mapDispatchToProps = (dispatch: Function) => ({
    fetch: (km = 1) => {
        if (!store.getState().analyzer.loading) {
            const center = store.getState().map.center
            dispatch(a.fetchBuildings(urlForGetAllInsideSquare(center, km)))
        }
    },
    setZoomed: (zoomed: Building) => dispatch(a.setZoomed(zoomed)),
    setSelected: (selected: Building) => dispatch(a.setSelected(selected)),
})

export default connect(mapStateToProps, mapDispatchToProps)(component)