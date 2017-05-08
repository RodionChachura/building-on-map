// @flow
const m = window.google.maps

export class Node {
    lat: number
    lon: number

    constructor(lat: number, lon: number) {
        this.lat = lat
        this.lon = lon
    }

    googleLatLng = () => new m.LatLng(this.lat, this.lon)
    latLng = () => ({lat: this.lat, lng: this.lon})
}

export type Nodes = Array<Node>

export type Action = {
    +type: string,
    payload?: any,
}



export const buildingShapes = ['square', 'rectangle', 'complex', 'circlelike', 'angular', 'simpleshape']

export type BuildingShape = 'square' | 'rectangle' | 'complex' | 'circlelike' | 'angular' | 'simpleshape'

export const buildingShapesColors = {
    square: '#6f39d6',
    rectangle: '#19bcb1',
    complex: '#d97e43',
    circlelike: '#d4ec14',
    angular: '#357ebd',
    simpleshape: '#ee2269',
}
