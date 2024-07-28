import { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import RoutingMachine from './RoutingMachine'; // Import the custom routing component

const lampangBounds: L.LatLngBoundsExpression = [
  [18.1888, 99.3931],
  [18.3888, 99.5931],
];

export default class MapPage extends Component {
  render() {
    const position: L.LatLngTuple = [18.2888, 99.4931];

    return (
      <MapContainer maxBounds={lampangBounds} center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <RoutingMachine waypoints={[position, [18.3200, 99.5200]]} /> {/* Add RoutingMachine with waypoints */}
      </MapContainer>
    );
  }
}
