import React from 'react'
import { Button, ButtonGroup } from 'reactstrap';
const g = window.google

import './styles.css'


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
            </div>
        )
    }

    startPolygon = (e) => {
        this.drawingManager.setMap(this.map)
        this.drawingManager.setDrawingMode(g.maps.drawing.OverlayType.POLYGON)        
    }

    startEnter = () => {
        this.drawingManager.setMap(this.map)
        this.drawingManager.setDrawingMode(g.maps.drawing.OverlayType.POLYLINE)
        const polylineOptions = {strokeColor: 'blue'}
        this.drawingManager.setOptions({polylineOptions})
        g.maps.event.addListenerOnce(this.drawingManager, 'polylinecomplete', (polyline) => {
            const coordinates = polyline.getPath().getArray().slice(0, 2)
            const precise = coordinates.map(c => ({lat: c.lat(), lng: c.lng()}))
            const enters = [...this.state.enters, {enter: precise}]
            this.setState({enters})
            this.props.setEnters(enters)
            this.drawingManager.setMap(null)        
        })
    }

    startExit = () => {
        this.drawingManager.setMap(this.map)
        this.drawingManager.setDrawingMode(g.maps.drawing.OverlayType.POLYLINE)
        const polylineOptions = {strokeColor: 'red'}
        this.drawingManager.setOptions({polylineOptions})
        g.maps.event.addListenerOnce(this.drawingManager, 'polylinecomplete', (polyline) => {
            const coordinates = polyline.getPath().getArray().slice(0, 2)
            const precise = coordinates.map(c => ({lat: c.lat(), lng: c.lng()}))
            const exits = [...this.state.exits, {exit: precise}]
            this.setState({exits})
            this.props.setExits(exits)
            this.drawingManager.setMap(null)        
        })
    }

    deletePolygon = (e) => {
        this.state.polygon.setMap(null)
        this.setState({polygon: null})
        this.props.setPolygon([])
    }

    componentDidMount() {
        this.map = new g.maps.Map(this.refs.map, {
            center: {lat: 53.9145899, lng: 27.5594437},
            zoom: 18,
            mapTypeControl: false,
            panControl: false,
            streetViewControl: false,
        })

        this.drawingManager = new g.maps.drawing.DrawingManager({
          drawingControl: false,
          drawingControlOptions: {
            position: g.maps.ControlPosition.TOP_CENTER,
            drawingModes: ['polygon', 'polyline']
          },
          polygonOptions: {
              fillColor: '#ffff00',
              strokeColor: 'green',
            //   editable: true
          }
        })
        this.drawingManager.setMap(this.map)

        g.maps.event.addListener(this.drawingManager, 'polygoncomplete', (polygon) => {
            const coordinates = polygon.getPath().getArray()
            const precise = coordinates.map(c => ({lat: c.lat(), lng: c.lng()}))
            this.props.setPolygon(precise)
            this.setState({polygon})
            this.drawingManager.setMap(null)
        })
    }
}