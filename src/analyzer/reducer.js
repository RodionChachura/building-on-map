import {createReducer} from 'redux-act'

import {Building} from '../models/analysis'
import * as a from './actions'

type State = {
    buildings: Array<Building>,
    loading: boolean,
    error: any,
    zoomed: Building,
    selected: Building,
}

export default createReducer({
    [a.fetchBuildingsPending]: (state: State): State => ({...state, loading: true, error: null}),
    [a.fetchBuildingsSuccess]: (state: State, buildings: Array<Building>): State => ({...state, buildings, loading: false, error: null}),
    [a.fetchBuildingsFailure]: (state: State, error: any): State => ({...state, error, loading: false}),
    [a.setZoomed]: (state: State, zoomed: Building): State => ({...state, zoomed}),
    [a.setSelected]: (state: State, selected: Building): State => ({...state, selected}),    
},
{
    buildings: [],
    loading: false,
    error: null
}
)
