import * as t from './actionTypes'

export const setPolygon = (coordinates) => ({
    type: t.SET_POLYGON,
    payload: coordinates,
})

export const setEnters = (enters) => ({
    type: t.SET_ENTERS,
    payload: enters,
})

export const setExits = (exits) => ({
    type: t.SET_EXITS,
    payload: exits,
})

export const setCenter = (center) => ({
    type: t.SET_CENTER,
    payload: center,
})