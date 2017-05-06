import * as t from './actionTypes'

const initialState = {
    buildings: [],
    loading: false,
    error: null,
    zoomed: null,
    selected: null,
}

export default (state = initialState, action) => {
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
        case t.SET_SELECTED: {
            return {...state, selected: action.payload}
        }
        case t.SET_ZOOMED: {
            return {...state, zoomed: action.payload}
        }
        default:
            return state
    }
}