import { createAction, createReducer } from 'redux-act'

import type {Nodes} from '../models/common'

export const setPlatform = createAction()
export const setEnters = createAction()
export const setExits = createAction()
export const setBuildingUC = createAction()

type State = {
    buildingUC: Nodes,
    enters: Array<Nodes>,
    exits: Array<Nodes>,
    platform: Nodes,
    completed: boolean
}

export default createReducer({
    [setPlatform]: (state: State, platform: Nodes): State => ({...state, platform}),
    [setEnters]: (state: State, enters: Array<Nodes>): State => ({...state, enters}),
    [setExits]: (state: State, exits: Array<Nodes>): State => ({...state, exits}),
    [setBuildingUC]: (state: State, buildingUC: Nodes): State => ({...state, buildingUC}),
},
{
    completed: false
}
)
