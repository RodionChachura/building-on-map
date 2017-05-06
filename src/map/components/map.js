// @flow
import React from 'react'
import { Button, ButtonGroup } from 'reactstrap';
const m = window.google.maps

import * as o from './options'
import {Node} from '../../models'
import {Building} from '../../analyzer/models'
import {statePropertyChangeListener} from '../../utils'
import './styles.css'


export default class Map extends React.Component {
    state = {
        polygon: null,
        enters: [],
        exits: []
    }

    map: any
    drawingManager: any

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
                    <Button color='info' hidden={this.state.polygon} onClick={this.startPolygon}>Start Polygon</Button>
                    <ButtonGroup hidden={!this.state.polygon}>
                        <Button color='warning' onClick={this.deletePolygon}>Remove polygon</Button>
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

    renderAllBuildings = (buildings: Array<Building>): void => {
        buildings.forEach((building) => {
            const coordinates = building.nodes.map(node => node.latLng())
            const options = o.buildingPolygonOptions(coordinates, building.shape)
            const buildingPolygon = new m.Polygon(options)
            buildingPolygon.setMap(this.map)
            m.event.addListener(buildingPolygon, 'click', (e) => console.log(coordinates))
        })
    }

    startPolygon = (e: Event): void => {
        this.drawingManager.setMap(this.map)
        this.drawingManager.setDrawingMode(m.drawing.OverlayType.POLYGON)        
    }

    startPolyline = (options: any, addPolylineCallback: Function) => {
        this.drawingManager.setMap(this.map)
        this.drawingManager.setDrawingMode(m.drawing.OverlayType.POLYLINE)
        this.drawingManager.setOptions({polylineOptions: options})
        m.event.addListenerOnce(this.drawingManager, 'polylinecomplete', (polyline) => {
            const coordinates = polyline.getPath().getArray().slice(0, 2)
            polyline.setPath(coordinates)
            const precise = coordinates.map(c => new Node(c.lat(), c.lng()))
            addPolylineCallback(precise)
            this.drawingManager.setMap(null)
        })
    }

    startEnter = () => {
        this.startPolyline(o.enterPolylineOptions, (enter) => {
            const enters = [...this.state.enters, {enter}]
            this.setState({enters})
            this.props.setEnters(enters)
        })
    }

    startExit = () => {
        this.startPolyline(o.exitPolylineOptions, (exit) => {
            const exits = [...this.state.exits, {exit}]
            this.setState({exits})
            this.props.setExits(exits)
        })
    }

    deletePolygon = (e: Event): void => {
        this.state.polygon.setMap(null)
        this.setState({polygon: null})
        this.props.setPolygon([])
    }

    componentDidMount() {
        this.map = new m.Map(this.refs.map, o.mapOptions)
        const setCenter = () => {
            const coordinates = this.map.getCenter()
            const node = new Node(coordinates.lat(), coordinates.lng())
            this.props.setCenter(node)
        }
        setCenter()
        this.map.addListener('center_changed', setCenter)

        this.drawingManager = new m.drawing.DrawingManager({
            drawingControl: false,
            polygonOptions: o.polygonOptions,
            polylineOptions: o.polylineOptions,
        })
        this.drawingManager.setMap(this.map)

        m.event.addListener(this.drawingManager, 'polygoncomplete', (polygon) => {
            const path = polygon.getPath()
            const updatePolygon = () => {
                const coordinates = path.getArray()
                console.log(coordinates)
                const precise = coordinates.map(c => new Node(c.lat(), c.lng()))
                this.props.setPolygon(precise)
            }
            updatePolygon()
            this.setState({polygon})
            this.drawingManager.setMap(null)
            m.event.addListener(path, 'insert_at', updatePolygon)
            m.event.addListener(path, 'set_at', updatePolygon)
            m.event.addListener(path, 'remove_at', updatePolygon)
        })
    }
}