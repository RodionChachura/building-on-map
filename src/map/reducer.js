import {createReducer} from 'redux-act'

import type {Nodes} from '../models/common'
import * as a from './actions'

export type State = {
    enters: Array<Nodes>,
    exits: Array<Nodes>,
    platform: Nodes,

    drawingManager: any,
    map: any,
}

export default createReducer({
    [a.setPlatform]: (state: State, platform: Nodes): State => ({...state, platform}),
    [a.setEnters]: (state: State, enters: Array<Nodes>): State => ({...state, enters}),
    [a.setExits]: (state: State, exits: Array<Nodes>): State => ({...state, exits}),
    [a.setDrawingManager]: (state: State, drawingManager: any): State => ({...state, drawingManager}),
    [a.setMap]: (state: State, map: any): State => ({...state, map}),
},
{
    completed: false
}
)