import {createReducer} from 'redux-act'

import {Building} from '../../models/analysis'
import * as a from './actions'

type State = {
    buildings: Array<Building>,
    loading: boolean,
    error: any,
}

export default createReducer({
    [a.fetchBuildingsPending]: (state: State): State => ({...state, loading: true, error: null}),
    [a.fetchBuildingsSuccess]: (state: State, buildings: Array<Building>): State => ({...state, buildings, loading: false, error: null}),
    [a.fetchBuildingsFailure]: (state: State, error: any): State => ({...state, error, loading: false}),
    [a.removeBuildings]: (state: State): State => ({...state, buildings: []}),
},
{
    buildings: [],
    loading: false,
    error: null
}
)
