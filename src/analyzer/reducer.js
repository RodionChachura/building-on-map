import * as t from './actionTypes'
import type {Action} from './../models/common'
import type {ReducerState} from './models'


const initialState: ReducerState = {
    buildings: [],
    loading: false,
    error: null,
    zoomed: undefined,
    selected: undefined,
}

export default (state: ReducerState = initialState, action: Action): ReducerState => {
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