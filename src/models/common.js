// @flow
const m = window.google.maps

export class XY {
    x: number
    y: number
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

export class Node {
    lat: number
    lon: number

    constructor(lat: number, lon: number) {
        this.lat = lat
        this.lon = lon
    }

    googleLatLng = () => new m.LatLng(this.lat, this.lon)
    latLng = () => ({lat: this.lat, lng: this.lon})

    inXYRelatively(origin: Node): XY {
        const db = m.geometry.spherical.computeDistanceBetween
        let x = db(origin.googleLatLng(), new Node(this.lat, origin.lon).googleLatLng())
        let y = db(origin.googleLatLng(), new Node(origin.lat, this.lon).googleLatLng())
        if (this.lon < origin.lon) x *= -1
        if (this.lat < origin.lat) y *= -1

        return new XY(x, y)
    }
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
