import * as t from './actionTypes'

const initialState = {
    buildings: [],
    loading: false,
    error: null,
}

export default (state = initialState, action) => {
    switch(action.type) {
        case t.FETCH_BUILDINGS_PENDING: {
            return {...state, loading: true, error: null}
        }
        case t.FETCH_BUILDINGS_SUCCESS: {
            return {...state, buildings: action.payload}
        }
        case t.FETCH_BUILDINGS_FAILURE: {
            return {...state, error: action.payload}
        }
        default:
            return state
    }
}