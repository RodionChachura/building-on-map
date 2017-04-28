import React from 'react'
import {Button} from 'reactstrap'
const g = window.google

import './styles.css'

export default class Map extends React.Component {
    render() {
        return (
            <div>
                <h2>Map</h2>
                <div ref='map' className={'map'}>I should be a map!</div>
                <Button onClick={this.startPolygon}>Polygon</Button>
            </div>
        )
    }

    startPolygon = () => {
        this.drawingManager.setMap(this.map)
        this.drawingManager.setDrawingMode(g.maps.drawing.OverlayType.POLYGON)
    }

    completePolygon = (polygon) => {
        const coordinates = polygon.getPath().getArray()
        const precise = coordinates.map(c => ({lat: c.lat(), lng: c.lng()}))
        this.props.setPolygon(precise)
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