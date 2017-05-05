// @flow
import type {Node} from '../models'
import type {OverpassElement} from './models'
import {Building} from './models'
const g = window.google

const url = 'http://overpass-api.de/api/interpreter'

export const toRadians = (degrees: number): number => degrees * Math.PI / 180
export const toDegrees = (radians: number): number => radians * 180 / Math.PI
export const latInKm  = 110.574 //km
export const lonInKm = (lat: number): number => 111.320 * Math.cos(toRadians(lat))

const inLat = (km: number): number => km / latInKm
const inLon = (lat: number, km: number): number => km / lonInKm(lat)

export const urlForGetAllInsideSquare = (center: Node, km: number): string => {
    const lat = inLat(km)
    const lon = inLon(lat, km)
    const polyline = `${center.lat - lat} ${center.lon + lon} ${center.lat + lat} ${center.lon + lon} ${center.lat + lat} ${center.lon - lon} ${center.lat - lat} ${center.lon - lon}`
    const query = `?data=[out:json];way(poly:"${polyline}")["building"];(._;>;);out body;`

    return url + query
}

export const fromOverpassElementsToBuildings = (elements: Array<OverpassElement>): Array<Building> => {
    const nodes = []
    return elements.reduce((buildings, v) => {
        if (v.type === 'node') {
            nodes.push(v)
        } else {
            const building = new Building(
                // Overpass returns building nodes with the same first and last node
                v.nodes.slice(0, -1).map((id) => {
                    const node = nodes.find(t => t.id === id)
                    return {lat: node.lat, lon: node.lon}
                })
            )
            buildings.push(building)
        }

        return buildings
    }, [])
}

export const findAngle = (a: Node, b: Node, c: Node): number => {
    // const ab = Math.sqrt(Math.pow(b.lat - a.lat, 2) + Math.pow(b.lon - a.lon, 2))    
    // const bc = Math.sqrt(Math.pow(b.lat - c.lat, 2) + Math.pow(b.lon - c.lon, 2)) 
    // const ac = Math.sqrt(Math.pow(c.lat - a.lat, 2) + Math.pow(c.lon - a.lon, 2))
                
    // return toDegrees(Math.acos((bc * bc + ab * ab - ac * ac) / (2 * bc * ab)))
    const ab = g.maps.geometry.spherical.computeHeading(new g.maps.LatLng(a.lat, a.lon), new g.maps.LatLng(b.lat, b.lon))
    const cb = g.maps.geometry.spherical.computeHeading(new g.maps.LatLng(b.lat, b.lon), new g.maps.LatLng(c.lat, c.lon))
    return (ab > cb)? ab - cb: cb - ab
}

