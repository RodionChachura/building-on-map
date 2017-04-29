import React from 'react'
import { Button, ButtonGroup } from 'reactstrap';
const g = window.google

import './styles.css'


export default class Map extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            polygon: null,
            enters: null,
            exits: null
        }
    }
    
    render() {
        return (
            <div>
                <h2>Map</h2>
                <div ref='map' className={'map'}>I should be a map!</div>
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

    deletePolygon = (e) => {
        this.state.polygon.setMap(null)
        this.setState({polygon: null})
        this.props.setPolygon([])
    }

    completePolygon = (polygon) => {
        const coordinates = polygon.getPath().getArray()
        const precise = coordinates.map(c => ({lat: c.lat(), lng: c.lng()}))
        this.props.setPolygon(precise)
        this.setState({polygon})
        this.drawingManager.setMap(null)
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

        g.maps.event.addListener(this.drawingManager, 'polygoncomplete', this.completePolygon)
    }
}