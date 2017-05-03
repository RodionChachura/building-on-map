import React from 'react'
import { Button, ButtonGroup } from 'reactstrap';
const g = window.google

import './styles.css'


const polygonOptions = {
    fillColor: '#ffff00',
    strokeColor: 'green',
    draggable: true,
    editable: true
}

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

const inLatLng = coordinates => coordinates.map(c => ({lat: c.lat(), lng: c.lng()}))

export default class Map extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            polygon: null,
            enters: [],
            exits: []
        }
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
            const precise = inLatLng(coordinates)
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
        this.map.addListener('center_changed', () => {
            this.props.setCenter(this.map.getCenter())
        })

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
                const precise = inLatLng(coordinates)
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