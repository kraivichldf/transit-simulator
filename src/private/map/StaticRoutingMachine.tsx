import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import stopIcon from '../../assets/stop-svgrepo-com.svg';

interface RoutingProps {
  waypoints: L.LatLngTuple[];
}

const StaticRoutingMachine: React.FC<RoutingProps> = ({ waypoints }) => {
  const map = useMap();
  const [currentWaypoints, setCurrentWaypoints] = useState([...waypoints] as L.LatLngTuple[]);
  useEffect(() => {
    if (!map) {
      return;
    }
    setCurrentWaypoints(waypoints);
    const plan = new L.Routing.Plan(currentWaypoints.map((point) => L.latLng(point)), {
      createMarker: function(i, waypoint) {
        return L.marker(waypoint.latLng, {
          draggable: false,
          icon: L.icon({
            iconUrl: stopIcon,
            iconSize: [20, 20],
            iconAnchor: [10, 10],
          }),
        });
      },
      routeWhileDragging: false,
      addWaypoints: false,
    });
    const routingControl = L.Routing.control({
      plan: plan,
      routeWhileDragging: false,
      addWaypoints: false,
      lineOptions: {styles: [{color: 'blue'}], extendToWaypoints: true, missingRouteTolerance: 0},
      waypointMode: 'snap',
    }).addTo(map);
    
    return () => {
      map.removeControl(routingControl);
    };
  }, [map, waypoints, currentWaypoints]);
  return null;
};

export default StaticRoutingMachine;