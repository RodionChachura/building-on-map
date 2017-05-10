import {createReducer} from 'redux-act'

import type {Nodes} from '../models/common'
import * as a from './actions'

type State = {
    buildingUC: Nodes,
    enters: Array<Nodes>,
    exits: Array<Nodes>,
    platform: Nodes,
    completed: boolean,

    drawingManager: any,
    map: any,
}

export default createReducer({
    [a.setPlatform]: (state: State, platform: Nodes): State => ({...state, platform}),
    [a.setEnters]: (state: State, enters: Array<Nodes>): State => ({...state, enters}),
    [a.setExits]: (state: State, exits: Array<Nodes>): State => ({...state, exits}),
    [a.setBuildingUC]: (state: State, buildingUC: Nodes): State => ({...state, buildingUC}),
    [a.setDrawingManager]: (state: State, drawingManager: any): State => ({...state, drawingManager}),
    [a.setMap]: (state: State, map: any): State => ({...state, map}),
},
{
    completed: false
}
)