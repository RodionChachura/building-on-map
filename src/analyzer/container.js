import { connect } from 'react-redux'
import store from '../store'

import component from './component'
import {Building} from '../models/analysis'
import * as u from '../utils/map'
import * as r from './redux'

const mapStateToProps = (state) => ({
    platform: state.map.platform,
    buildings: state.analyzer.buildings,
})

const mapDispatchToProps = (dispatch: Function) => ({
    fetch: (km = 1) => {
        if (!store.getState().analyzer.loading) {
            const center = u.getPolygonCenter(store.getState().map.platform)
            dispatch(r.fetchBuildings(u.urlForGetAllInsideSquare(center, km)))
        }
    },
    setZoomed: (zoomed: Building) => dispatch(r.setZoomed(zoomed)),
    setSelected: (selected: Building) => dispatch(r.setSelected(selected)),
})

export default connect(mapStateToProps, mapDispatchToProps)(component)