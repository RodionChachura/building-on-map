// @flow
import type {Nodes, BuildingShape} from '../models/common'
import * as u from '../utils/map'
import * as o from '../utils/gMapsOptions'

const m = window.google.maps


export type OverpassNode = {
    type: string,
    id: number,
    lat: number,
    lon: number,
}

export type OverpassBuilding = {
    type: string,
    id: number,
    nodes: Array<number>
}

export type OverpassElement = OverpassNode | OverpassBuilding

export class Building {
    nodes: Nodes
    shape: BuildingShape
    google: any
    map: any

    constructor(nodes: Nodes) {
        this.nodes = nodes
        this.shape = u.getShape(nodes)
    }

    render(map: any): any {
        const options = o.buildingPolygonOptions(this.nodes, this.shape)
        const polygon = new m.Polygon(options)
        polygon.setMap(map)

        // simplified life
        this.map = map
        this.google = polygon
    }

    zoom() {
        const center = u.getPolygonCenter(this.nodes)
        this.map.setCenter(center.googleLatLng())
        this.google.setOptions(o.zoomedBuildingPolygonOptions(this.nodes))
    }

    unzoom() {
        this.google.setOptions(o.buildingPolygonOptions(this.nodes, this.shape))   
    }
}


export class AnalyzerShape {
    shape: BuildingShape
    buildings: Array<Building>
    zoomedPosition: number

    // empty array not allowed
    constructor(shape: BuildingShape, buildings: Array<Building>) {
        this.shape = shape
        this.buildings = buildings
        this.zoomedPosition = 0
    }

    get zoomed(): Building {
        return this.buildings[this.zoomedPosition]
    }

    get next(): Building {
        if (this.zoomedPosition === this.size - 1) {
            this.zoomedPosition = 0
        } else {
            this.zoomedPosition += 1
        }
        return this.zoomed
    }

    get size(): number {
        return this.buildings.length
    }
}
