import {combineReducers} from "redux";

import jsonViewReducer from './jsonview/reducer'
import manageReducer from './manage/reducer'
import mapReducer from './map/reducer'

export default combineReducers({
    jsonViewReducer,
    manageReducer,
    mapReducer
})
