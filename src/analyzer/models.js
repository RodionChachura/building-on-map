// @flow

import {getShape} from '../utils/map'
import type {Nodes} from '../models'
import * as u from '../utils/map'
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

export class Building {
    nodes: Nodes
    shape: BuildingShape
    googlePolygon: any

    constructor(nodes: Nodes) {
        this.nodes = nodes
        this.shape = getShape(nodes)
    }

    initOnGoogleMap(map: any, options: any): void {
        this.googlePolygon = new m.Polygon(options)
        this.googlePolygon.setMap(map)

        // for debug only
        const coordinates = this.nodes.map(node => node.latLng())
        m.event.addListener(this.googlePolygon, 'click', (e) => console.log(coordinates))
    }

    increase() {
        this.nodes = u.resizePolygon(this.nodes, 1.1)
        console.log(this.nodes)
        this.googlePolygon.setPath(this.nodes.map(n => n.googleLatLng()))
    }

    decrease() {
        this.nodes = u.resizePolygon(this.nodes, 0.9)
        this.googlePolygon.setPath(this.nodes.map(n => n.googleLatLng()))
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

    zoomed(): Building {
        return this.buildings[this.zoomedPosition]
    }

    next(): Building {
        if (this.zoomedPosition === this.size() - 1) {
            this.zoomedPosition = 0
        } else {
            this.zoomedPosition += 1
        }
        return this.zoomed()
    }

    size(): number {
        return this.buildings.length
    }
}
