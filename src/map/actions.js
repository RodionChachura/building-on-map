// @flow
import type {Action} from '../models/common'
import {Construction} from '../models/construction'
import * as t from './actionTypes'

export const setConstruction = (construction: Construction): Action => {
    return {
        type: t.SET_CONSTRUCTION,
        payload: construction,
    }
}