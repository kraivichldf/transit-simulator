import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

interface RoutingProps {
  waypoints: L.LatLngTuple[];
}


const RoutingMachine: React.FC<RoutingProps> = ({ waypoints }) => {
  const map = useMap();

  useEffect(() => {
    const routingControl = L.Routing.control({
      waypoints: waypoints.map((point) => L.latLng(point)),
      routeWhileDragging: false,
      addWaypoints: false,
      createMarker: function(i: number, waypoint: { latLng: L.LatLngExpression; }) {
        return L.marker(waypoint.latLng, { draggable: false }).bindPopup(`Waypoint ${i + 1}`);
      }
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, waypoints]);

  return null;
};

export default RoutingMachine;
