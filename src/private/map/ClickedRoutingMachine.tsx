import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

interface RoutingProps {
  waypoints: L.LatLngTuple[];
}


const ClickedRoutingMachine: React.FC<RoutingProps> = ({ waypoints }) => {
  const map = useMap();
  const [currentWaypoints, setCurrentWaypoints] = useState([...waypoints] as L.LatLngTuple[]);
  const [labels, setLabels] = useState<L.Marker[]>([]);
  useEffect(() => {
    if (!map) {
      return;
    }
    
    setCurrentWaypoints(waypoints);
    const plan = new L.Routing.Plan(currentWaypoints.map((point) => L.latLng(point)), {
      createMarker: function(i, waypoint) {
        return L.marker(waypoint.latLng, {
          draggable: false,
        });
      },
      routeWhileDragging: false,
      addWaypoints: false,
    });

    const routingControl = L.Routing.control({
      plan: plan,
      routeWhileDragging: false,
      addWaypoints: false,
      waypointMode: 'snap',
    }).addTo(map);
    
    routingControl.on('routesfound', function (e: L.Routing.RoutingResultEvent) {
      const routes = e.routes;
      if (routes.length > 0) {
        const waypoints = currentWaypoints ? currentWaypoints : [];
        for (let i = 0; i < waypoints.length - 1; i++) {
          const start = waypoints[i];
          const end = waypoints[i + 1];
          const distance = (map.distance(start, end) / 1000).toFixed(2); 
          if (distance === '0.00') {
            continue;
          }
          const midPoint = L.latLng(
            (start[0] + end[0]) / 2,
            (start[1] + end[1]) / 2
          );
          const distanceText = `Distance: ${distance} km`;

          const label = L.marker(midPoint, {
            icon: L.divIcon({
              className: 'distance-label',
              html: `<div style="background-color: white; padding: 2px 5px; border-radius: 3px; border: 1px solid #ccc;">${distanceText}</div>`,
              iconSize: [100, 20],
            }),
          }).addTo(map);

          setLabels(prevLabels => [...prevLabels, label]);
          console.log(labels)
          console.log("waypoints:", currentWaypoints)
        }
      }
    });
    return () => {
      map.removeControl(routingControl);
    };
  }, [map, currentWaypoints, waypoints]);
  useEffect(() => {
    const handleClick = (e: L.LeafletMouseEvent) => {
      const newWaypoint = [e.latlng.lat, e.latlng.lng] as L.LatLngTuple;
      setCurrentWaypoints([...currentWaypoints, newWaypoint]);
    };

    map.on('click', handleClick);

    return () => {
      map.off('click', handleClick);
    };
  }, [map, currentWaypoints]);
  return null;
};



export default ClickedRoutingMachine;
