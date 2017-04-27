import React from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';


const Map = withGoogleMap(props => (
  <GoogleMap
    disableDefaultUI={true}
    scaleControl={false}s
    defaultZoom={15}
    defaultCenter={{ lat: 53.9045, lng: 27.5615 }}
    onClick={props.onMapClick}
  ></GoogleMap>
));


export default () => (
    <Map
        containerElement={
        <div style={{ height: `100%` }} />
        }
        mapElement={
        <div style={{ height: `100%` }} />
        }
        onMapLoad={console.log('onMapLoad')}
        onMapClick={console.log('onMapClick')}
        markers={[]}
        onMarkerRightClick={console.log('onMarkerRightClick')}
    />
)