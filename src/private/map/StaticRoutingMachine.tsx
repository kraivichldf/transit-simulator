import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

interface RoutingProps {
  waypoints: L.LatLngTuple[];
  lineColor: string;
  markerColor: string;
}

const StaticRoutingMachine: React.FC<RoutingProps> = ({ waypoints, lineColor, markerColor }) => {
  const map = useMap();
  const [currentWaypoints, setCurrentWaypoints] = useState([...waypoints] as L.LatLngTuple[]);
  useEffect(() => {
    if (!map) {
      return;
    }
    setCurrentWaypoints(waypoints);
    const customDivIcon = function(name: string, number: number) {
      return L.divIcon({
          className: `${name}-div-icon`,
          iconSize: [25, 25],
          popupAnchor: [0, -12],
          html: `<div>${number}</div>`,
      });
    };
    const plan = new L.Routing.Plan(currentWaypoints.map((point) => L.latLng(point)), {
      createMarker: function(i, waypoint) {
        return L.marker(waypoint.latLng, {
          draggable: false,
          icon: customDivIcon(markerColor, i),
        });
      },
      routeWhileDragging: false,
      addWaypoints: false,
    })
    const routingControl = L.Routing.control({
      plan: plan,
      routeWhileDragging: false,
      addWaypoints: false,
      lineOptions: {styles: [{color: lineColor}], extendToWaypoints: true, missingRouteTolerance: 0},
      waypointMode: 'snap',
    })
    .addTo(map);
    
    return () => {
      map.removeControl(routingControl);
    };
  }, [map, waypoints, currentWaypoints]);
  return null;
};

export default StaticRoutingMachine;