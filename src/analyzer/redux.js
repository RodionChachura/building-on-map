import { createAction, createReducer } from 'redux-act'
import axios from 'axios'

import {Building} from '../models/analysis'
import {fromOverpassElementsToBuildings} from '../utils/map'

type State = {
    buildings: Array<Building>,
    loading: boolean,
    error: any,
    zoomed: Building,
    selected: Building,
}

const fetchBuildingsPending = createAction()
const fetchBuildingsSuccess = createAction()
const fetchBuildingsFailure = createAction()
export const fetchBuildings = (url: string) => (dispatch: Function) => {
    dispatch(fetchBuildingsPending())
    return axios.get(url)
        .then(json => json.data.elements)
        .then(elements => fromOverpassElementsToBuildings(elements))
        .then(json => dispatch(fetchBuildingsSuccess(json)))
        .catch(error => dispatch(fetchBuildingsFailure(error)))
}

export const setZoomed = createAction()
export const setSelected = createAction()

export default createReducer({
    [fetchBuildingsPending]: (state: State): State => ({...state, loading: true, error: null}),
    [fetchBuildingsSuccess]: (state: State, buildings: Array<Building>): State => ({...state, buildings, loading: false, error: null}),
    [fetchBuildingsFailure]: (state: State, error: any): State => ({...state, error, loading: false}),
    [setZoomed]: (state: State, zoomed: Building): State => ({...state, zoomed}),
    [setSelected]: (state: State, selected: Building): State => ({...state, selected}),    
},
{
    buildings: [],
    loading: false,
    error: null,
    zoomed: Building,
    selected: Building,
}
)

