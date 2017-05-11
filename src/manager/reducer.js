import {combineReducers} from 'redux'
import {createReducer} from 'redux-act'

import {BuildingUC} from '../models/construction'
import * as a from './actions'
import analyzer from './analyzer/reducer'

type State = {
    buildingUC: BuildingUC,
}

export const common = createReducer({
    [a.setBuildingUC]: (state: State, buildingUC: BuildingUC): State => ({...state, buildingUC}),
},
{
    buildingUC: undefined,
}
)

export default combineReducers({
    common,
    analyzer
})
