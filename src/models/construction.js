// @flow
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
    onChangeCallback: Function | void

    _afterSetPath() {
        const path = this.google.getPath()
        const updatePolygon = () => {
            if (this.onChangeCallback) this.onChangeCallback(this) 
        } 
        m.event.addListener(path, 'insert_at', updatePolygon) 
        m.event.addListener(path, 'set_at', updatePolygon) 
        m.event.addListener(path, 'remove_at', updatePolygon) 
    }

    constructor(map: any, nodes: Nodes, onChangeCallback?: Function) {
        const options = o.buildingOptions(nodes)
        const google = new m.Polygon(options)
        super(map, google)
    }

    increase() {
        const path = u.resizePolygon(this.nodes, 1.1)
        this.google.setPath(path)
        this._afterSetPath()
    }

    decrease() {
        const path = u.resizePolygon(this.nodes, 0.9)
        this.google.setPath(path)
        this._afterSetPath()        
    }

    rotatateLeft() {
        const origin = this.google.getCenter()
        this.google.rotate(-20, origin)
        this._afterSetPath()        
    }

    rotatateRight() {
        const origin = this.google.getCenter()
        this.google.rotate(20, origin)
        this._afterSetPath()        
    }

    makeRed() {
        this.google.setOptions(o.buildingOutsideContainer) 
    }

    makeGreen() {
        this.google.setOptions(o.buildingInsideContainer) 
    }
}


class Polyline{
    google: any
    map: any
    drawingManager: any
    options: any

    constructor(map: any, drawingManager: any, options: any) {
        this.map = map
    }

    start() {
        this.drawingManager.setMap(this.map)
        this.drawingManager.setDrawingMode(m.drawing.OverlayType.POLYLINE)
        this.drawingManager.setOptions({polylineOptions: this.options})
        m.event.addListenerOnce(this.drawingManager, 'polylinecomplete', (polyline) => {
            const coordinates = polyline.getPath().getArray().slice(0, 2)
            this.google.setPath(coordinates)
            this.drawingManager.setMap(null)
        })
    }

    get nodes(): Nodes {
        const path = this.google.getPath()
        const gCoordinates = path.getArray()
        return gCoordinates.map(c => new Node(c.lat(), c.lng()))
    }
}

export class Enter extends Polyline {
    constructor(map: any, drawingManager: any) {
        super(map, drawingManager, o.enterPolylineOptions)
    }
}

export class Exit extends Polyline {
    constructor(map: any, drawingManager: any) {
        super(map, drawingManager, o.exitPolylineOptions)
    }
}

export class Platform {
    map: any
    google: any
    drawingManager: any

    constructor(map: any, drawingManager: any) {
        this.map = map
        this.drawingManager = drawingManager
    }

    start() {
        this.drawingManager.setMap(this.map)
        this.drawingManager.setDrawingMode(m.drawing.OverlayType.POLYGON)
        m.event.addListenerOnce(this.drawingManager, 'polygoncomplete', (polygon) => {
            this.google = polygon
            this.drawingManager.setMap(null)
        })
    }

    remove() {
        this.google.setMap(null)
    }

    get nodes(): Nodes {
        const path = this.google.getPath()
        const gCoordinates = path.getArray()
        return gCoordinates.map(c => new Node(c.lat(), c.lng()))
    }
}

export class Construction {
    building: BuildingUC
    platform: Platform
    enters: Array<Enter>
    exits: Array<Exit>
    map: any

    initOnMap(map: any) {
        this.map = map
    }

    setBuildingUCfromNodes(nodes: Nodes) {
        const polygon = u.polygonWithNewCenter(nodes, u.getPolygonCenter(this.platform.nodes))
        if (this.building) {
            this.platform.google.setMap(null)
        }
        this.building = new BuildingUC(this.map, polygon, this.onBuildingUCChanges)
        const center = u.getPolygonCenter(polygon)
        this.map.setCenter(center.googleLatLng())
    }

    onBuildingUCChanges(building: BuildingUC) {
         if (u.polygonInsideContainer(this.platform.nodes, building.nodes)) {
             building.makeRed()
         } else {
             building.makeGreen()
         }
    }

    get center() {
        return u.getPolygonCenter(this.platform.nodes)
    }
}