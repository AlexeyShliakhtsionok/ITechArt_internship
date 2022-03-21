import React, { Component } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px',
  margin: 'auto',
};

const center = {
  lat: 53.837646,
  lng: 27.568144,
};

const markerPosition = {
  lat: 53.837646,
  lng: 27.568144,
};

class MapComponent extends Component {
  render() {
    return (
      <LoadScript googleMapsApiKey="AIzaSyCnT9OyZBakiha93EwmXeZRl25AHdPiTVE">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
          <>
            <Marker position={markerPosition} />
          </>
        </GoogleMap>
      </LoadScript>
    );
  }
}

export default React.memo(MapComponent);
