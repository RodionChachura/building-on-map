import {createStore, applyMiddleware} from "redux"
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import reducer from './rootReducer'

const middleware = applyMiddleware(thunkMiddleware, createLogger)
const store = createStore(reducer, middleware)
export default store