import * as t from './actionTypes'

export const setPolygon = (coordinates) => ({
    type: t.SET_POLYGON,
    payload: coordinates
})