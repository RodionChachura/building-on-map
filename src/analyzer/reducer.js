import * as t from './actionTypes'
import * as m from './models'
import type {Action} from './../models'

type State = {
    buildings: Array<m.Building>,
    loading: boolean,
    error: any,
    zoomed: m.Building,
    selected: m.Building,
}

const initialState: State = {
    buildings: [],
    loading: false,
    error: null,
    zoomed: null,
    selected: null,
}

export default (state: State = initialState, action: Action): State => {
    switch(action.type) {
        case t.FETCH_BUILDINGS_PENDING: {
            return {...state, loading: true, error: null}
        }
        case t.FETCH_BUILDINGS_SUCCESS: {
            return {...state, buildings: action.payload, loading: false, error: null}
        }
        case t.FETCH_BUILDINGS_FAILURE: {
            return {...state, error: action.payload, loading: false}
        }
        case t.SET_ZOOMED: {
            return {...state, zoomed: action.payload}
        }
        case t.SET_SELECTED: {
            return {...state, selected: action.payload}
        }
        default:
            return state
    }
}