// @flow
import React from 'react'
import { Button, ButtonGroup } from 'reactstrap';
const g = window.google

import type {Nodes} from '../models'
import type {BuildingShape} from '../analyzer/models'
import {statePropertyChangeListener} from '../utils'
import './styles.css'

const shapesColor = {
    triangle: '#a3d242',
    square: '#6f39d6',
    rectangle: '#19bcb1',
    complex: '#d97e43',
    circlelike: '#d4ec14',
    angular: '#357ebd'
}

const polygonOptions = {
    fillColor: '#ffff00',
    strokeColor: 'green',
    draggable: true,
    editable: true
}

const buildingPolygonOptions = (coordinates: Nodes, shape: BuildingShape) => ({
    paths: coordinates,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: shapesColor[shape],
    fillOpacity: 0.35    
})

const polylineOptions = {
    editable: true
}

const enterPolylineOptions = {
    strokeColor: 'blue',
}

const exitPolylineOptions = {
    strokeColor: 'red',
}

const mapOptions = {
    center: {lat: 53.9145899, lng: 27.5594437},
    zoom: 18,
    mapTypeControl: false,
    panControl: false,
    streetViewControl: false,
}

const inLatLon = c => ({lat: c.lat(), lon: c.lng()})

export default class Map extends React.Component {
    state = {
        polygon: null,
        enters: [],
        exits: []
    }
    constructor(props) {
        super(props)
        statePropertyChangeListener('analyzer.buildings', this.renderAllBuildings)
    }
    
    render() {
        return (
            <div>
                <h2>Map</h2>
                <div ref='map' className={'map'}></div>
                <div className={'row justify-content-center manage'}>
                    <ButtonGroup>
                        <Button color='info' hidden={this.state.polygon} onClick={this.startPolygon}>Polygon</Button>
                        <Button color='warning' hidden={!this.state.polygon} onClick={this.deletePolygon}>Remove polygon</Button>
                        <Button color='info'  onClick={this.startEnter}>Enter</Button>
                        <Button color='info' onClick={this.startExit}>Exit</Button>
                    </ButtonGroup>
                </div>
                <footer className={'row justify-content-center'}>
                    click twice to finish enter or exit
                </footer>
            </div>
        )
    }

    renderAllBuildings = (buildings) => {
        buildings.forEach((building) => {
            const coordinates = building.nodes.map((node) => {
                return {lat: node.lat, lng: node.lon}
            })
            const options = buildingPolygonOptions(coordinates, building.shape)
            const buildingPolygon = new g.maps.Polygon(options)
            buildingPolygon.setMap(this.map)
        })
    }

    startPolygon = (e) => {
        this.drawingManager.setMap(this.map)
        this.drawingManager.setDrawingMode(g.maps.drawing.OverlayType.POLYGON)        
    }

    startPolyline = (options, addPolylineCallback) => {
        this.drawingManager.setMap(this.map)
        this.drawingManager.setDrawingMode(g.maps.drawing.OverlayType.POLYLINE)
        this.drawingManager.setOptions({polylineOptions: options})
        g.maps.event.addListenerOnce(this.drawingManager, 'polylinecomplete', (polyline) => {
            const coordinates = polyline.getPath().getArray().slice(0, 2)
            polyline.setPath(coordinates)
            const precise = coordinates.map(inLatLon)
            addPolylineCallback(precise)
            this.drawingManager.setMap(null)
        })
    }

    startEnter = () => {
        this.startPolyline(enterPolylineOptions, (enter) => {
            const enters = [...this.state.enters, {enter}]
            this.setState({enters})
            this.props.setEnters(enters)
        })
    }

    startExit = () => {
        this.startPolyline(exitPolylineOptions, (exit) => {
            const exits = [...this.state.exits, {exit}]
            this.setState({exits})
            this.props.setExits(exits)
        })
    }

    deletePolygon = (e) => {
        this.state.polygon.setMap(null)
        this.setState({polygon: null})
        this.props.setPolygon([])
    }

    componentDidMount() {
        this.map = new g.maps.Map(this.refs.map, mapOptions)
        const setCenter = () => this.props.setCenter(inLatLon(this.map.getCenter()))
        setCenter()
        this.map.addListener('center_changed', setCenter)

        this.drawingManager = new g.maps.drawing.DrawingManager({
            drawingControl: false,
            polygonOptions,
            polylineOptions
        })
        this.drawingManager.setMap(this.map)

        g.maps.event.addListener(this.drawingManager, 'polygoncomplete', (polygon) => {
            const path = polygon.getPath()
            const updatePolygon = () => {
                const coordinates = path.getArray()
                const precise = coordinates.map(inLatLon)
                this.props.setPolygon(precise)
            }
            updatePolygon()
            this.setState({polygon})
            this.drawingManager.setMap(null)
            g.maps.event.addListener(path, 'insert_at', updatePolygon)
            g.maps.event.addListener(path, 'set_at', updatePolygon)
            g.maps.event.addListener(path, 'remove_at', updatePolygon)
        })
    }
}