import axios from 'axios'

import * as t from './actionTypes'
import type {Action} from '../models/common'
import {Building} from '../models/analysis'
import {fromOverpassElementsToBuildings} from '../utils/map'

const fetchBuildingsPending = (): Action => ({
    type: t.FETCH_BUILDINGS_PENDING,
})

const fetchBuildingsSuccess = (buildings: Array<Building>): Action => ({
    type: t.FETCH_BUILDINGS_SUCCESS,
    payload: buildings,
})

const fetchBuildingsFailure = (error: any): Action => ({
    type: t.FETCH_BUILDINGS_FAILURE,
    payload: error,
})

export const fetchBuildings = (url: string) => (dispatch: Function) => {
    dispatch(fetchBuildingsPending())
    return axios.get(url)
        .then(json => json.data.elements)
        .then(elements => fromOverpassElementsToBuildings(elements))
        .then(json => dispatch(fetchBuildingsSuccess(json)))
        .catch(error => dispatch(fetchBuildingsFailure(error)))
}

export const setZoomed = (building: Building): Action => ({
    type: t.SET_ZOOMED,
    payload: building
})

export const setSelected = (building: Building): Action => ({
    type: t.SET_SELECTED,
    payload: building
})
