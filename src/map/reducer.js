import * as t from './actionTypes'
import type {ReducerState} from './models'
import {Construction} from '../models/construction'

// toflow
// null values
const initialState: ReducerState = {
    construction: new Construction(),
}

export default (state: ReducerState = initialState, action: any): ReducerState => {
    switch(action.type) {
        case t.SET_CONSTRUCTION:  return {...state, construction: action.payload}
        default: return state
    }
}