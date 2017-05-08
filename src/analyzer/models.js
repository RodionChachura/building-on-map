// @flow

import {getShape} from '../utils/map'
import type {Nodes} from '../models'
import {Node} from '../models'
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
    onChangeCallback: Function | void

    constructor(nodes: Nodes) {
        this.nodes = nodes
        this.shape = getShape(nodes)
    }

    setPath(path: any = this.googlePolygon.getPath()) {
        this.googlePolygon.setPath(path)
        const updatePolygon = () => {
            const coordinates = path.getArray()
            this.nodes = coordinates.map(c => new Node(c.lat(), c.lng()))
            if (this.onChangeCallback) this.onChangeCallback(this)
        }
        m.event.addListener(path, 'insert_at', updatePolygon)
        m.event.addListener(path, 'set_at', updatePolygon)
        m.event.addListener(path, 'remove_at', updatePolygon)

        // for debug only
        // const coordinates = this.nodes.map(node => node.latLng())
        // m.event.addListener(this.googlePolygon, 'click', (e) => console.log(coordinates))
    }

    // onChangeCallback: argument will be building itself
    initOnGoogleMap(map: any, options: any, onChangeCallback?: Function): void {
        this.onChangeCallback = onChangeCallback
        this.googlePolygon = new m.Polygon(options)
        this.googlePolygon.setMap(map)
        this.setPath()
    }

    increase() {
        this.nodes = u.resizePolygon(this.nodes, 1.1)
        this.setPath(this.nodes.map(n => n.googleLatLng()))
    }

    decrease() {
        this.nodes = u.resizePolygon(this.nodes, 0.9)
        this.setPath(this.nodes.map(n => n.googleLatLng()))
    }

    rotatateLeft() {
        const origin = this.googlePolygon.getCenter()
        this.googlePolygon.rotate(-20, origin)
        this.setPath()
    }

    rotateRight() {
        const origin = this.googlePolygon.getCenter()
        this.googlePolygon.rotate(20, origin)
        this.setPath()
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
