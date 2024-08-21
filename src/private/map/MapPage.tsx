import { Component } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import StaticRoutingMachine from './StaticRoutingMachine';
import './MapPage.scss';
const lampangBounds: L.LatLngBoundsExpression = [
  [18.1888, 99.3931],
  [18.3888, 99.5931],
];

export default class MapPage extends Component {
  render() {
    const position: L.LatLngTuple = [18.2888, 99.4931];
    const blueLine: { coordinates: L.LatLngTuple; stopNumber: number; }[] = [
      { coordinates: [18.26839647550336, 99.46656703948975], stopNumber: 1 },
      { coordinates: [18.271636256904458, 99.46938872337343], stopNumber: 2 },
      { coordinates: [18.27486579011517, 99.47316527366638], stopNumber: 3 },
      { coordinates: [18.27950113492691, 99.47870135307313], stopNumber: 4 },
      { coordinates: [18.28148767335692, 99.48119044303894], stopNumber: 5 },
      { coordinates: [18.28366774575424, 99.48392629623415], stopNumber: 6 },
      { coordinates: [18.28712116882958, 99.48826074600221], stopNumber: 7 },
      { coordinates: [18.288455659025896, 99.48999881744386], stopNumber: 8 },
      { coordinates: [18.28712116882958, 99.48826074600221], stopNumber: 9 },
      { coordinates: [18.28366774575424, 99.48392629623415], stopNumber: 10 },
      { coordinates: [18.28148767335692, 99.48119044303894], stopNumber: 11 },
      { coordinates: [18.27950113492691, 99.47870135307313], stopNumber: 12 },
      { coordinates: [18.274712974441144, 99.47334766387941], stopNumber: 13 },
      { coordinates: [18.271330619733344, 99.4696569442749], stopNumber: 14 },
      { coordinates: [18.268529269496074, 99.46701892051196], stopNumber: 15 }
    ];
    return (
      <MapContainer maxBounds={lampangBounds} center={position} zoom={13} minZoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* <ClickedRoutingMachine waypoints={waypoints} /> 
        <MapClickHandler onClick={(e) => waypoints.push([e.latlng.lat, e.latlng.lng])} /> */}
        <StaticRoutingMachine stops={blueLine} lineColor="rgb(0, 0, 255)" markerColor="blue" vehicleNumber={5}/>
      </MapContainer>
    );
  }
}