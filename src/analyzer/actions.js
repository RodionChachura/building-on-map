import axios from 'axios'

import * as t from './actionTypes'

const url = 'https://api.github.com/users/mojombo'

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

export const fetchBuildings = () => (dispatch) => {
    dispatch(fetchBuildingsPending())
    return axios.get(url)
        .then(json => dispatch(fetchBuildingsSuccess(json)))
        .catch(error => dispatch(fetchBuildingsFailure(error)))
}