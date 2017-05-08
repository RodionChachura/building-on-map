// @flow

import type {Nodes} from '../../models'
import type {BuildingShape} from '../../analyzer/models'
import {buildingShapesColors} from '../../analyzer/models'

const m = window.google.maps

export const polygonOptions = {
    fillColor: '#ffff00',
    fillOpacity: 0.35,
    strokeColor: 'green',
    draggable: true,
    editable: true
}

export const buildingPolygonOptions = (nodes: Nodes, shape: BuildingShape) => ({
    paths: nodes.map(n => n.latLng()),
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: buildingShapesColors[shape],
    fillOpacity: 0.35    
})

export const zoomedBuildingPolygonOptions = (nodes: Nodes) => ({
    paths: nodes.map(n => n.latLng()),
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 1       
})

export const buildingOptions = (nodes: Nodes) => ({
    paths: nodes.map(n => n.latLng()),
    strokeColor: '#700000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#df3e20',
    fillOpacity: 0.5,
    draggable: true,
    // editable: true,
    zIndex: m.Marker.MAX_ZINDEX + 1
})

export const buildingInsideContainer = {
    strokeColor: '#143514',
    fillColor: '#00ff04',
}

export const buildingOutsideContainer = {
    fillColor: '#ff0000',
    strokeColor: '#892121',
}

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