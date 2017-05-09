import {combineReducers} from "redux";

import map from './map/redux'
import analyzer from './analyzer/redux'

export default combineReducers({
    map,
    analyzer,
})
