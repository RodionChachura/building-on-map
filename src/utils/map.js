// @flow
import type {Nodes} from '../models/common'
import {Node} from '../models/common'
import type {OverpassElement} from '../models/analysis'
import type {BuildingShape} from '../models/common'
import {Building} from '../models/analysis'

const m = window.google.maps

const url = 'https://overpass-api.de/api/interpreter'

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
    const nodes = elements.filter(e => e.type === 'node')
    const buildings = elements.filter(e => e.type !== 'node')

    return buildings.map((building) => new Building(
        building.nodes.slice(0, -1).map((id) => {
                const node = nodes.find(t => t.id === id)
                return new Node(node.lat, node.lon)
            })
    ))
}

export const getAngle = (a: Node, b: Node, c: Node): number => {
    const ab = m.geometry.spherical.computeHeading(a.googleLatLng(), b.googleLatLng())
    const cb = m.geometry.spherical.computeHeading(b.googleLatLng(), c.googleLatLng())
    
    return (ab > cb)? ab - cb: cb - ab
}

export const getAngles = (nodes: Nodes): Array<number> => {
    return nodes.map((node, index) => {
            const a = node
            let b, c
            if (index === nodes.length - 2) {
                b = nodes[index + 1]
                c = nodes[0]
            } else if (index === nodes.length - 1) {
                b = nodes[0]
                c = nodes[1]
            } else {
                b = nodes[index + 1]
                c = nodes[index + 2]
            }
            return getAngle(a, b, c)
        })
}

export const getEdgesLen = (nodes: Nodes): Array<number> => {
        return nodes.map((node, index) => {
            const nextIndex = (index === nodes.length - 1) ? 0: index + 1
            const nextNode = nodes[nextIndex]

            return m.geometry.spherical.computeDistanceBetween(node.googleLatLng(), nextNode.googleLatLng())
        })
    }

export const getShape = (nodes: Nodes): BuildingShape => {
    const nodesLen = nodes.length
    const edgesLen = getEdgesLen(nodes)
    const angles = getAngles(nodes)
    const numberOfRightAngles = angles.filter((a) => ((a > 80 && a < 100) || (a > 260 && a < 280))).length
    const rectangular = numberOfRightAngles === nodes.length || numberOfRightAngles === nodes.length - 1
    if (nodesLen === 4) {
        if (rectangular) {
            const ratio = edgesLen[0] / edgesLen[1]
            return (ratio > 3/4.5 && ratio < 4.5/3)? 'square': 'rectangle'
        }
        return 'simpleshape'
    } else if (nodesLen === 5) {
        return (Math.min(...edgesLen) < 10 && rectangular)? 'rectangle': 'simpleshape'
    } else {
        // check if looks like circle
        const area = m.geometry.spherical.computeArea(nodes.map((v) => v.googleLatLng()))
        const perimetr = edgesLen.reduce((sum, v) => sum + v)
        const t = 4 * Math.PI * (area / (perimetr * perimetr))
        if (t > 0.8 && t < 1.2) {
            return 'circlelike'
        } else if (rectangular) {
            return 'angular'
        } else if (angles.length < 10) {
            return 'simpleshape'
        }
    }
    return 'complex'
}

export const getPolygonCenter = (nodes: Nodes): Node => {
    const bounds = new m.LatLngBounds()
    const coordinates = nodes.map(n => n.googleLatLng())
    coordinates.forEach(c => bounds.extend(c))
    const center = bounds.getCenter()
    return new Node(center.lat(), center.lng())
}

export const polygonWithNewCenter = (polygon: Nodes, newCenter: Node): Nodes => {
    const oldCenter = getPolygonCenter(polygon)
    const latDiff = newCenter.lat - oldCenter.lat
    const lonDiff = newCenter.lon - oldCenter.lon

    return polygon.map(n => new Node(n.lat + latDiff, n.lon + lonDiff))
}

export const resizePolygon = (polygon: Nodes, ratio: number = 1.1): Nodes => {
    const center = getPolygonCenter(polygon)
    return polygon.map((n) => {
        const latDiff = center.lat - n.lat
        const lonDiff = center.lon - n.lon
        if (ratio > 1) {
            n.lat -= latDiff * (ratio - 1)
            n.lon -= lonDiff * (ratio - 1)
        } else {
            n.lat += latDiff * (1 - ratio)
            n.lon += lonDiff * (1 - ratio)
        }

        return n
    })
}

export  const polygonInsideContainer = (container: Nodes, polygon: Nodes): boolean => {
    const c = new m.Polygon({paths: container.map(n => ({lat: n.lat, lng: n.lon}))})
    const outside = polygon.find(n => !m.geometry.poly.containsLocation(n.googleLatLng(), c))

    return outside === undefined? true: false
}




// code from https://github.com/ahmadnassri/google-maps-polygon-rotate
m.LatLng.prototype.distanceTo = function (point: any) {
    const lat = Math.pow(this.lat() - point.lat(), 2)
    const lng = Math.pow(this.lng() - point.lng(), 2)
    return Math.sqrt(lat + lng)
}
m.LatLng.prototype.rotate = function (angle: number, origin: any) {
    const radianAngle = angle * (Math.PI / 180)
    const radius = this.distanceTo(origin)
    const theta = radianAngle + Math.atan2(this.lng() - origin.lng(), this.lat() - origin.lat())
    const x = origin.lat() + (radius * Math.cos(theta))
    const y = origin.lng() + (radius * Math.sin(theta))
    return new m.LatLng(x, y)
}
m.Point.prototype.rotate = function (angle, origin) {
  const rad = angle * (Math.PI / 180)
  const x = this.x - origin.x
  const y = this.y - origin.y
  return new m.Point(
    x * Math.cos(rad) - y * Math.sin(rad) + origin.x,
    x * Math.sin(rad) + y * Math.cos(rad) + origin.y
  )
}
m.Polygon.prototype.getCenter = function () {
  const coords = this.getPath().getArray()
  const bounds = new m.LatLngBounds()
  coords.forEach((point, index) => {
    bounds.extend(coords[index])
  })

  return bounds.getCenter()
}
m.Polygon.prototype.rotate = function (angle, latLng, map=this.getMap()) {
    if (map === undefined) {
        console.warn('No valid google maps object found')
        return
    }
    const coords = this.getPath().getArray()
    const projection = map.getProjection()
    const origin = projection.fromLatLngToPoint(latLng)

    coords.forEach((point, index) => {
        const pixelCoord = projection.fromLatLngToPoint(point).rotate(angle, origin)

        coords[index] = projection.fromPointToLatLng(pixelCoord)
    })

    this.setPaths(coords)
}

