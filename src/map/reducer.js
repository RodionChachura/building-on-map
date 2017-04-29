import * as t from './actionTypes'

const initialState = {
    polygon: [],
    enters: [],
    exitx: []
}

export default (state = initialState, action) => {
    switch(action.type) {
        case t.SET_POLYGON: {
            return {...state, polygon: action.payload}
        }
        default:
            return state
    }
}