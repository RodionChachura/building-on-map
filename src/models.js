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