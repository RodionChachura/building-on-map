// @flow
import type {Nodes} from './common'

import * as o from '../utils/gMapsOptions'
import * as u from '../utils/map'

const m = window.google.maps
import {map} from '../map/global'


// building under construction
export class BuildingUC {
    onChangeCallback: Function
    google: any

    _afterSetPath() {
        const path = this.google.getPath()
        const updatePolygon = () => {
            if (this.onChangeCallback) this.onChangeCallback(this) 
        }
        updatePolygon()
        m.event.addListener(path, 'insert_at', updatePolygon) 
        m.event.addListener(path, 'set_at', updatePolygon) 
        m.event.addListener(path, 'remove_at', updatePolygon) 
    }

    constructor(nodes: Nodes, onChangeCallback: Function) {
        const options = o.buildingOptions(nodes)
        this.google = new m.Polygon(options)
        this.google.setMap(map)
        this.onChangeCallback = onChangeCallback
        this._afterSetPath()
    }

    kill() {
        this.google.setMap(null)
    }

    increase () {
        const nodes = u.resizePolygon(this.google.nodes(), 1.1)
        this.google.setPathFromNodes(nodes)
        this._afterSetPath()
    }

    decrease() {
        const nodes = u.resizePolygon(this.google.nodes(), 0.9)
        this.google.setPathFromNodes(nodes)
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
