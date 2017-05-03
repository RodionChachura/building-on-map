import * as t from './actionTypes'

const initialState = {
    polygon: [],
    enters: [],
    exits: [],
    center: null,
}

export default (state = initialState, action) => {
    switch(action.type) {
        case t.SET_POLYGON: {
            return {...state, polygon: action.payload}
        }
        case t.SET_ENTERS: {
            return {...state, enters: action.payload}
        }
        case t.SET_EXITS: {
            return {...state, exits: action.payload}
        }
        case t.SET_CENTER: {
            return {...state, center: action.payload}
        }
        default:
            return state
    }
}