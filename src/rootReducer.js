import {combineReducers} from 'redux'

import map from './map/reducer'
import manager from './manager/reducer'
import type {State as MapState} from './map/reducer'
import type {State as ManagerState} from './manager/reducer'

export type State = {
    map: MapState,
    manager: ManagerState,
}

export default combineReducers({
    map,
    manager,
})
