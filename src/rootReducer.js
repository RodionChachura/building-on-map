import {combineReducers} from "redux";

import map from './map/reducer'
import analyzer from './analyzer/reducer'

export default combineReducers({
    map,
    analyzer,
})
