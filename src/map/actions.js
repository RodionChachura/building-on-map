// @flow

import type {Nodes, Action} from '../models'
import {Node} from '../models'
import * as t from './actionTypes'

export const setPolygon = (coordinates: Nodes): Action => ({
    type: t.SET_POLYGON,
    payload: coordinates,
})

export const setEnters = (enters: Array<Nodes>): Action => ({
    type: t.SET_ENTERS,
    payload: enters,
})

export const setExits = (exits: Array<Nodes>): Action => ({
    type: t.SET_EXITS,
    payload: exits,
})

export const setCenter = (center: Node): Action => ({
    type: t.SET_CENTER,
    payload: center,
})