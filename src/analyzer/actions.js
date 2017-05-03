import axios from 'axios'

import * as t from './actionTypes'

const fetchBuildingsPending = () => ({
    type: t.FETCH_BUILDINGS_PENDING,
})

const fetchBuildingsSuccess = (json) => ({
    type: t.FETCH_BUILDINGS_SUCCESS,
    payload: json,
})

const fetchBuildingsFailure = (error) => ({
    type: t.FETCH_BUILDINGS_FAILURE,
    payload: error,
})

export const fetchBuildings = (url) => (dispatch) => {
    dispatch(fetchBuildingsPending())
    return axios.get(url)
        .then(json => json.data.elements)
        .then(json => dispatch(fetchBuildingsSuccess(json)))
        .catch(error => dispatch(fetchBuildingsFailure(error)))
}