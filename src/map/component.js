import React from 'react'
import './styles.css'

export default class Map extends React.Component {
    render() {
        return (
            <div>
                <h2>Map</h2>
                <div ref="map" className={'map'}>I should be a map!</div>
            </div>
        )
    }
    
    componentDidMount() {
        this.map = new window.google.maps.Map(this.refs.map, {
            center: {lat: 53.9145899, lng: 27.5594437},
            zoom: 18,
            mapTypeControl: false,
            panControl: false,
            streetViewControl: false,
        })
    }
}