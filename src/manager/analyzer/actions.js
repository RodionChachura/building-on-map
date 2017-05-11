import {createAction} from 'redux-act'
import axios from 'axios'

import {fromOverpassElementsToBuildings} from '../../utils/map'

export const fetchBuildingsPending = createAction('fetch building from overpass API')
export const fetchBuildingsSuccess = createAction('buildings successfully fetched from overpass API')
export const fetchBuildingsFailure = createAction('error during fetching buildings from overpass API')

export const fetchBuildings = (url: string) => (dispatch: Function) => {
    dispatch(fetchBuildingsPending())
    return axios.get(url)
        .then(json => json.data.elements)
        .then(elements => fromOverpassElementsToBuildings(elements))
        .then(json => dispatch(fetchBuildingsSuccess(json)))
        .catch(error => dispatch(fetchBuildingsFailure(error)))
}
