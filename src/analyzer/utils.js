// @flow
import type {Node} from '../models'
import type {OverpassElement} from './models'
import {Building} from './models'
const url = 'http://overpass-api.de/api/interpreter'

const toRadians = (degrees: number): number => degrees * Math.PI / 180
const latInKm = 110.574 //km
const lonInKm = (lat: number): number => 111.320 * Math.cos(toRadians(lat))

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
            const building = new Building()
            building.nodes = v.nodes.map((id) => {
                const node = nodes.find(t => t.id === id)
                return {lat: node.lat, lon: node.lon}
            })
            buildings.push(building)
        }

        return buildings
    }, [])
}

