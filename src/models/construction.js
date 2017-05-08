import type {Nodes} from './common'
import {Node} from './common'

import * as o from '../utils/gMapsOptions'
import * as u from '../utils/map'

const m = window.google.maps


class GMapsObject {
    google: any
    map: any

    constructor(map: any, google: any) {
        this.map = map
        this.google = google
        this.google.setMap(this.map)
    }

    get nodes(): Nodes {
        const path = this.google.getPath()
        const gCoordinates = path.getArray()
        return gCoordinates.map(c => new Node(c.lat(), c.lng()))
    }
}

// building under construction
export class BuildingUC extends GMapsObject {
    google: any
    map: any

    constructor(map: any, nodes: Nodes) {
        const options = o.buildingOptions(nodes)
        const google = new m.Polygon(options)
        super(map, nodes, google)
    }

    increase() {
        const path = u.resizePolygon(this.nodes, 1.1)
        this.google.setPath(path)
    }

    decrease() {
        const path = u.resizePolygon(this.nodes, 0.9)
        this.google.setPath(path)
    }

    rotatateLeft() {
        const origin = this.google.getCenter()
        this.google.rotate(-20, origin)
    }

    rotateRight() {
        const origin = this.google.getCenter()
        this.google.rotate(20, origin)
    }
}

export class Polygon extends GMapsObject {
    nodes: Array<Node>
    google: any
    map: any
}

export class Enter extends GMapsObject {
    nodes: Array<Node>
    google: any
    map: any
}

export class Exit extends GMapsObject {
    nodes: Array<Node>
    google: any
    map: any
}

export class Construction {
    building: Building
    polygon: Polygon
    enters: Array<Enter>
    exits: Array<Exit>
}