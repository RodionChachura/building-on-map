import React from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import './styles.css'

const PreMap = withGoogleMap(props => (
  <GoogleMap
    disableDefaultUI={true}
    scaleControl={false}
    defaultZoom={15}
    defaultCenter={{ lat: 53.9045, lng: 27.5615 }}
    onClick={props.onMapClick}
  ></GoogleMap>
));

const Map = () => (
    <PreMap
        containerElement={
          <div style={{ height: `100%` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        onMapLoad={console.log('onMapLoad')}
        onMapClick={console.log('onMapClick')}
        onMarkerRightClick={console.log('onMarkerRightClick')}
    ></PreMap>
)

export default () => (
  <div className="map">
    <h2>Map</h2>
    <Map />
  </div>
)