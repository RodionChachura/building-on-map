import * as t from './actionTypes'
import type {State} from './models'

const initialState: State = {
    polygon: [],
    enters: [],
    exits: [],
    center: null,
}

export default (state: State = initialState, action: any): State => {
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