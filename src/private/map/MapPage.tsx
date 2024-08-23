import { Component } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import StaticRoutingMachine from './StaticRoutingMachine';
import './MapPage.scss';
import ClickedRoutingMachine from './ClickedRoutingMachine';
import MapClickHandler from './MapClickHandler';
const lampangBounds: L.LatLngBoundsExpression = [
  [18.1888, 99.3931],
  [18.3888, 99.5931],
];

export default class MapPage extends Component {
  
  render() {
    const waypoints: L.LatLngTuple[] = [];
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
    const redLine: { coordinates: L.LatLngTuple; stopNumber: number; }[] = [
      { coordinates: [18.284177104514207, 99.4666635990143], stopNumber: 1 },
      { coordinates: [18.282363780511222, 99.46985006332399], stopNumber: 2 },
      { coordinates: [18.28061156177694, 99.47299897670746], stopNumber: 3 },
      { coordinates: [18.279327948447087, 99.47576701641083], stopNumber: 4 },
      { coordinates: [18.278625013312585, 99.47764456272127], stopNumber: 5 },
      { coordinates: [18.27910891823969, 99.48019802570344], stopNumber: 6 },
      { coordinates: [18.280356877347856, 99.48336839675905], stopNumber: 7 },
      { coordinates: [18.281273739542296, 99.48581457138063], stopNumber: 8 },
      { coordinates: [18.28281201966941, 99.48989152908325], stopNumber: 9 },
      { coordinates: [18.284604964716348, 99.49459075927736], stopNumber: 10 },
      { coordinates: [18.285837603682467, 99.49798107147217], stopNumber: 11 },
      { coordinates: [18.286917428964482, 99.50083494186403], stopNumber: 12 },
      { coordinates: [18.288516780468264, 99.50514793395998], stopNumber: 13 },
      { coordinates: [18.29024345231172, 99.50968086719514], stopNumber: 14 },
      { coordinates: [18.291654318896377, 99.51349496841432], stopNumber: 15 },
      { coordinates: [18.29266280133028, 99.51626300811769], stopNumber: 16 },
      { coordinates: [18.291491331285556, 99.51354324817659], stopNumber: 17 },
      { coordinates: [18.290131397433694, 99.50994908809662], stopNumber: 18 },
      { coordinates: [18.2883486964499, 99.50523376464844], stopNumber: 19 },
      { coordinates: [18.286917428964482, 99.50083494186403], stopNumber: 20 },
      { coordinates: [18.285837603682467, 99.49798107147217], stopNumber: 21 },
      { coordinates: [18.284533654755975, 99.4946336746216], stopNumber: 22 },
      { coordinates: [18.282720334481304, 99.48993444442749], stopNumber: 23 },
      { coordinates: [18.281146397860695, 99.48586285114288], stopNumber: 24 },
      { coordinates: [18.280229534993087, 99.4834166765213], stopNumber: 25 },
      { coordinates: [18.27910891823969, 99.48019802570344], stopNumber: 26 },
      { coordinates: [18.278625013312585, 99.47764456272127], stopNumber: 27 },
      { coordinates: [18.279327948447087, 99.47576701641083], stopNumber: 28 },
      { coordinates: [18.28061156177694, 99.47299897670746], stopNumber: 29 },
      { coordinates: [18.282363780511222, 99.46985006332399], stopNumber: 30 },
      { coordinates: [18.284177104514207, 99.4666635990143], stopNumber: 31 }
    ]
    return (
      <MapContainer maxBounds={lampangBounds} center={position} zoom={13} minZoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <ClickedRoutingMachine waypoints={waypoints} /> 
        <MapClickHandler onClick={(e) => waypoints.push([e.latlng.lat, e.latlng.lng])} />
        <StaticRoutingMachine stops={blueLine} lineColor="rgb(0, 0, 255)" markerColor="blue" vehicleNumber={5}/>
        <StaticRoutingMachine stops={redLine} lineColor="rgb(255, 0, 0)" markerColor="red" vehicleNumber={8}/>
      </MapContainer>
    );
  }
}