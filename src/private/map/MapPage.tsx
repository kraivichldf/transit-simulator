import { Component } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import ClickedRoutingMachine from './ClickedRoutingMachine'; // Import the custom routing component
import MapClickHandler from './MapClickHandler';
import StaticRoutingMachine from './StaticRoutingMachine';

const lampangBounds: L.LatLngBoundsExpression = [
  [18.1888, 99.3931],
  [18.3888, 99.5931],
];

export default class MapPage extends Component {
  render() {
    const position: L.LatLngTuple = [18.2888, 99.4931];
    const waypoints: L.LatLngTuple[] = [];
    const staticWaypoint: L.LatLngTuple[] = [
      [
          18.26839647550336,
          99.46656703948975
      ],
      [
          18.271636256904458,
          99.46938872337343
      ],
      [
          18.27486579011517,
          99.47316527366638
      ],
      [
          18.27950113492691,
          99.47870135307313
      ],
      [
          18.28148767335692,
          99.48119044303894
      ],
      [
          18.28366774575424,
          99.48392629623415
      ],
      [
          18.28712116882958,
          99.48826074600221
      ],
      [
          18.288455659025896,
          99.48999881744386
      ]
    ];
    return (
      <MapContainer maxBounds={lampangBounds} center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <ClickedRoutingMachine waypoints={waypoints} /> 
        <MapClickHandler onClick={(e) => waypoints.push([e.latlng.lat, e.latlng.lng])} />
        <StaticRoutingMachine waypoints={staticWaypoint} />
      </MapContainer>
    );
  }
}