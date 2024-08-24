import { Component } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import StaticRoutingMachine from './StaticRoutingMachine';
import './MapPage.scss';
// import ClickedRoutingMachine from './ClickedRoutingMachine';
// import MapClickHandler from './MapClickHandler';
const lampangBounds: L.LatLngBoundsExpression = [
  [18.1888, 99.3931],
  [18.3888, 99.5931],
];

export default class MapPage extends Component {
  
  render() {
    // const waypoints: L.LatLngTuple[] = [];
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
      { coordinates: [18.28712116882958, 99.48826074600221], stopNumber: 7 },
      { coordinates: [18.28366774575424, 99.48392629623415], stopNumber: 6 },
      { coordinates: [18.28148767335692, 99.48119044303894], stopNumber: 5 },
      { coordinates: [18.27950113492691, 99.47870135307313], stopNumber: 4 },
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
      { coordinates: [18.286917428964482, 99.50083494186403], stopNumber: 12 },
      { coordinates: [18.285837603682467, 99.49798107147217], stopNumber: 11 },
      { coordinates: [18.284533654755975, 99.4946336746216], stopNumber: 10 },
      { coordinates: [18.282720334481304, 99.48993444442749], stopNumber: 9 },
      { coordinates: [18.281146397860695, 99.48586285114288], stopNumber: 8 },
      { coordinates: [18.280229534993087, 99.4834166765213], stopNumber: 7 },
      { coordinates: [18.27910891823969, 99.48019802570344], stopNumber: 6 },
      { coordinates: [18.278625013312585, 99.47764456272127], stopNumber: 5 },
      { coordinates: [18.279327948447087, 99.47576701641083], stopNumber: 4 },
      { coordinates: [18.28061156177694, 99.47299897670746], stopNumber: 3 },
      { coordinates: [18.282363780511222, 99.46985006332399], stopNumber: 2 },
      { coordinates: [18.284177104514207, 99.4666635990143], stopNumber: 1 }
    ]
    const yellowLine: { coordinates: L.LatLngTuple; stopNumber: number; }[] = [
      { coordinates: [18.284574403308344, 99.46664214134218], stopNumber: 1 },
      { coordinates: [18.287549021766964, 99.46869134902956], stopNumber: 2 },
      { coordinates: [18.28981051260956, 99.47353005409241], stopNumber: 3 },
      { coordinates: [18.289820699438497, 99.47977423667908], stopNumber: 4 },
      { coordinates: [18.289423412666135, 99.4857394695282], stopNumber: 5 },
      { coordinates: [18.28898537747716, 99.49007391929628], stopNumber: 6 },
      { coordinates: [18.289423412666135, 99.4857394695282], stopNumber: 5 },
      { coordinates: [18.289820699438497, 99.47977423667908], stopNumber: 4 },
      { coordinates: [18.28981051260956, 99.47353005409241], stopNumber: 3 },
      { coordinates: [18.287549021766964, 99.46869134902956], stopNumber: 2 },
      { coordinates: [18.284574403308344, 99.46664214134218], stopNumber: 1 },
    ]
    const greenLine: { coordinates: L.LatLngTuple; stopNumber: number; }[] = [
      { coordinates: [18.288908975877344, 99.49133455753328], stopNumber: 1 },
      { coordinates: [18.28854734118137, 99.49602842330934], stopNumber: 2 },
      { coordinates: [18.28884276113028, 99.49892520904542], stopNumber: 3 },
      { coordinates: [18.289148367444227, 99.5011031627655], stopNumber: 4 },
      { coordinates: [18.290574523119083, 99.5007061958313], stopNumber: 5 },
      { coordinates: [18.28997350180081, 99.49778795242311], stopNumber: 6 },
      { coordinates: [18.289953128160274, 99.49433326721193], stopNumber: 7 },
      { coordinates: [18.290421721286567, 99.49170470237733], stopNumber: 8 },
      { coordinates: [18.288908975877344, 99.49133455753328], stopNumber: 1 }
    ]
    const purpleLine: { coordinates: L.LatLngTuple; stopNumber: number; }[] = [
      { coordinates: [18.288363976821937, 99.49173688888551], stopNumber: 1 },
      { coordinates: [18.285740826559962, 99.50036287307739], stopNumber: 2 },
      { coordinates: [18.277748887273166, 99.4989198446274], stopNumber: 3 },
      { coordinates: [18.273673824288277, 99.49804544448854], stopNumber: 4 },
      { coordinates: [18.267326723080476, 99.49691891670227], stopNumber: 5 },
      { coordinates: [18.26136655318692, 99.49560999870302], stopNumber: 6 },
      { coordinates: [18.25678166789379, 99.49342131614685], stopNumber: 7 },
      { coordinates: [18.253378585886527, 99.4913935661316], stopNumber: 8 },
      { coordinates: [18.249730897017393, 99.49051380157472], stopNumber: 9 },
      { coordinates: [18.24247604799423, 99.49138820171358], stopNumber: 10 },
      { coordinates: [18.2372588907466, 99.49071764945985], stopNumber: 11 },
      { coordinates: [18.232464470528647, 99.49060499668123], stopNumber: 12 },
      { coordinates: [18.23010542460795, 99.49057281017305], stopNumber: 13 },
      { coordinates: [18.232515421491453, 99.49040651321413], stopNumber: 14 },
      { coordinates: [18.237391359566832, 99.49056744575502], stopNumber: 15 },
      { coordinates: [18.24247604799423, 99.49138820171358], stopNumber: 10 },
      { coordinates: [18.249730897017393, 99.49051380157472], stopNumber: 9 },
      { coordinates: [18.253378585886527, 99.4913935661316], stopNumber: 8 },
      { coordinates: [18.25678166789379, 99.49342131614685], stopNumber: 7 },
      { coordinates: [18.26136655318692, 99.49560999870302], stopNumber: 6 },
      { coordinates: [18.267326723080476, 99.49691891670227], stopNumber: 5 },
      { coordinates: [18.273673824288277, 99.49804544448854], stopNumber: 4 },
      { coordinates: [18.277748887273166, 99.4989198446274], stopNumber: 3 },
      { coordinates: [18.285740826559962, 99.50036287307739], stopNumber: 2 },
      { coordinates: [18.288363976821937, 99.49173688888551], stopNumber: 1 },
    ]
    const blackLine: { coordinates: L.LatLngTuple; stopNumber: number; }[] = [
      {
        coordinates: [18.28862883638997, 99.4902402162552],
        stopNumber: 1
      },
      {
        coordinates: [18.284172010934025, 99.48684990406038],
        stopNumber: 2
      },
      {
        coordinates: [18.28133486351626, 99.48812127113344],
        stopNumber: 3
      },
      {
        coordinates: [18.27859445085082, 99.48760092258455],
        stopNumber: 4
      },
      {
        coordinates: [18.275828525766553, 99.48378682136537],
        stopNumber: 5
      },
      {
        coordinates: [18.274183212395744, 99.48144793510438],
        stopNumber: 6
      },
      {
        coordinates: [18.27511538875998, 99.48184490203859],
        stopNumber: 7
      },
      {
        coordinates: [18.27728535368339, 99.48355615139009],
        stopNumber: 8
      },
      {
        coordinates: [18.27964885267011, 99.48269784450532],
        stopNumber: 9
      },
      {
        coordinates: [18.283097262166866, 99.4868177175522],
        stopNumber: 10
      },
      {
        coordinates: [18.28862883638997, 99.4902402162552],
        stopNumber: 1
      },
    ]
    return (
      <MapContainer maxBounds={lampangBounds} center={position} zoom={13} minZoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* <ClickedRoutingMachine waypoints={waypoints} /> 
        <MapClickHandler onClick={(e) => waypoints.push([e.latlng.lat, e.latlng.lng])} /> */}
        <StaticRoutingMachine stops={blueLine} lineColor="rgb(0, 0, 255)" markerColor="blue" vehicleNumber={5}/>
        <StaticRoutingMachine stops={redLine} lineColor="rgb(255, 0, 0)" markerColor="red" vehicleNumber={8}/>
        <StaticRoutingMachine stops={yellowLine} lineColor="rgb(255, 255, 0)" markerColor="yellow" vehicleNumber={3}/>
        <StaticRoutingMachine stops={greenLine} lineColor="rgb(0, 255, 0)" markerColor="green" vehicleNumber={4}/>
        <StaticRoutingMachine stops={purpleLine} lineColor="rgb(128, 0, 128)" markerColor="purple" vehicleNumber={10}/>
        <StaticRoutingMachine stops={blackLine} lineColor="rgb(0, 0, 0)" markerColor="black" vehicleNumber={5}/>
      </MapContainer>
    );
  }
}