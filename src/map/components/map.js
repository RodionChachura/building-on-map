// @flow
import React from 'react'
import { Button, ButtonGroup } from 'reactstrap';
const m = window.google.maps

import * as o from './options'
import {Node} from '../../models'
import {Building} from '../../analyzer/models'
import {getPolygonCenter, polygonWithNewCenter} from '../../utils/map'
import {statePropertyChangeListener} from '../../utils'
import './styles.css'

// toflow
// State

type Props = {
    buildings: Array<Building>,
    polygon: Array<Node>,
    building: Building,

    setPolygon: Function,
    setEnters: Function,
    setExits: Function,
    setCenter: Function,
    setBuilding: Function,
}

type State = {
    polygon: any,
    enters: any,
    exits: any,
    zoomed: any,
}

export default class Map extends React.Component<void, Props, State> {
    state: State = {
        polygon: null,
        enters: null,
        exits: null,
        zoomed: null,
    }

    map: any
    drawingManager: any

    constructor(props: Props) {
        super(props)
        statePropertyChangeListener('analyzer.buildings', this.renderAllBuildings)
        statePropertyChangeListener('analyzer.zoomed', this.zoomToBuilding)
        statePropertyChangeListener('analyzer.selected', this.selectBuilding)
    }
    
    render() {
        return (
            <div>
                <div ref='map' className={'map'}></div>
                <div className={'row justify-content-center manage'}>
                    <Button color='info' hidden={this.state.polygon} onClick={this.startPolygon}>Start Polygon</Button>
                    <div hidden={!this.state.polygon}>
                        <ButtonGroup>
                            <Button color='warning' onClick={this.deletePolygon}>Remove polygon</Button>
                            <Button color='info'  onClick={this.startEnter}>Enter</Button>
                            <Button color='info' onClick={this.startExit}>Exit</Button>
                        </ButtonGroup>
                        <ButtonGroup hidden={!this.props.building}>
                            <Button color='info'  onClick={this.increase}>+</Button>
                            <Button color='info' onClick={this.decrease}>-</Button>
                            <Button color='info'  onClick={this.rotatateLeft}>left</Button>
                            <Button color='info' onClick={this.rotatateRight}>right</Button>
                        </ButtonGroup>
                        <p>click twice to finish enter or exit</p>
                    </div>
                </div>
                
            </div>
        )
    }

    increase = () => {
        this.props.building.increase()
    }

    decrease = () => {
        this.props.building.decrease()
    }

    rotatateLeft = () => {
        this.props.building.rotatateLeft()
    }

    rotatateRight = () => {
        this.props.building.rotateRight()
    }

    renderAllBuildings = (buildings: Array<Building>): void => {
        buildings.forEach((building) => {
            const options = o.buildingPolygonOptions(building.nodes, building.shape)
            building.initOnGoogleMap(this.map, options)
        })
    }

    unzoomBuilding() {
        const z = this.state.zoomed
        z.googlePolygon.setOptions(o.buildingPolygonOptions(z.nodes, z.shape))        
    }

    zoomToBuilding = (zoomed: Building): void => {
        if (this.state.zoomed)
            this.unzoomBuilding()
        const center = getPolygonCenter(zoomed.nodes)
        this.map.setCenter(center.googleLatLng())
        this.setState({zoomed})
        zoomed.googlePolygon.setOptions(o.zoomedBuildingPolygonOptions(zoomed.nodes))
        // this.props.buildings.forEach(b => b.googlePolygon.setOptions(o.buildingPolygonOptions(b.nodes,'circlelike')))
    }

    selectBuilding = (selected: Building): void => {
        if (this.props.building) {
            this.props.building.googlePolygon.setMap(null)
        }
        // create building and init on map
        const polygon = polygonWithNewCenter(selected.nodes, getPolygonCenter(this.props.polygon))
        const building = new Building(polygon)
        building.initOnGoogleMap(this.map, o.buildingOptions(building.nodes))
        // zoom to the new place on the map
        const center = getPolygonCenter(polygon)
        this.map.setCenter(center.googleLatLng())
        this.props.setBuilding(building)
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