// @flow

import type {Nodes} from '../../models'
import type {BuildingShape} from '../../analyzer/models'
import {buildingShapesColors} from '../../analyzer/models'

export const polygonOptions = {
    fillColor: '#ffff00',
    strokeColor: 'green',
    draggable: true,
    editable: true
}

export const buildingPolygonOptions = (coordinates: Nodes, shape: BuildingShape) => ({
    paths: coordinates,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: buildingShapesColors[shape],
    fillOpacity: 0.35    
})

export const polylineOptions = {
    editable: true
}

export const enterPolylineOptions = {
    strokeColor: 'blue',
}

export const exitPolylineOptions = {
    strokeColor: 'red',
}

export const mapOptions = {
    center: {lat: 53.9145899, lng: 27.5594437},
    zoom: 18,
    mapTypeControl: false,
    panControl: false,
    streetViewControl: false,
}