import { useEffect, useRef, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

interface Stop {
  coordinates: L.LatLngTuple;
  stopNumber: number;
}

interface RoutingProps {
  stops: Stop[];
  lineColor: string;
  markerColor: string;
  vehicleNumber: number;
}

interface Vehicle {
  startPointIndex: number;
  vehicleMarker: L.Marker | null;
  finishRoute: boolean;
  waitingTime: number;
}

const StaticRoutingMachine: React.FC<RoutingProps> = ({ stops, lineColor, markerColor, vehicleNumber }) => {
  const map = useMap();
  const [routePath, setRoutePath] = useState<L.LatLngTuple[]>([]);
  const [vehicleState, setVehicleState] = useState<Vehicle[]>([]);
  const [isVehicleAdded, setIsVehicleAdded] = useState(false);
  const animationFrameRef = useRef<number | null>(null);

  const customDivIcon = (name: string, number: number | string) => {
    return L.divIcon({
      className: `${name}-div-icon`,
      iconSize: [25, 25],
      popupAnchor: [0, 0],
      html: `<div>${number}</div>`,
    });
  };

  const interpolatePoints = (path: L.LatLngTuple[], segmentDistance: number) => {
    const interpolatedPath: L.LatLngTuple[] = [];
    for (let i = 0; i < path.length - 1; i++) {
      const start = L.latLng(path[i]);
      const end = L.latLng(path[i + 1]);
      const segmentLength = map.distance(start, end);
      const numPoints = Math.ceil(segmentLength / segmentDistance);
      for (let j = 0; j < numPoints; j++) {
        const factor = j / numPoints;
        const interpolatedPoint: L.LatLngTuple = [
          start.lat + factor * (end.lat - start.lat),
          start.lng + factor * (end.lng - start.lng),
        ];
        interpolatedPath.push(interpolatedPoint);
      }
    }
    interpolatedPath.push(path[path.length - 1]); 
    return interpolatedPath;
  };

  const animateVehicle = (vehicleIndex: number, path: L.LatLngTuple[], speed: number) => {
    let startTime: number | null = null;
    const totalPoints = path.length;
    const animate = (time: number) => {
      
      if (!startTime) startTime = time;
      const {totalDistance, nearestStartpointIndex} = calculateTotalDistance( vehicleIndex ,path, map);
      const elapsedTime = time - startTime;
      const duration = (totalDistance / speed ) * 1000;
      const factor = elapsedTime / (duration);
      if (factor < 1) {
        const vehicleStartIndex = nearestStartpointIndex;
        const index = vehicleStartIndex + Math.min(Math.floor(factor * (totalPoints - vehicleStartIndex)), totalPoints - vehicleStartIndex - 1);
        if (vehicleState[vehicleIndex].vehicleMarker) {
          const newPosition = path[index];
          vehicleState[vehicleIndex].vehicleMarker.setLatLng(newPosition);
        }
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        if (vehicleState[vehicleIndex].vehicleMarker) {
          vehicleState[vehicleIndex].vehicleMarker.setLatLng(path[totalPoints - 1]);
        }
        setVehicleState((prevState) => {
          const newState = [...prevState];
          newState[vehicleIndex] = {
            ...newState[vehicleIndex],
            startPointIndex: 0,
            finishRoute: true
          };
          return newState.map((vehicle, index) => index === vehicleIndex ? newState[vehicleIndex] : vehicle);
        });
      }
    };
    animationFrameRef.current = requestAnimationFrame(animate);
  };

  const startAddingVehicles = () => {
    setVehicleState(
      Array(vehicleNumber)
        .fill(0)
        .map((_, i) => ({
          startPointIndex: i,
          vehicleMarker: null,
          finishRoute: true,
          waitingTime: 0,
        }))
    );
  };

  function calculateTotalDistance(vehicleIndex: number, routePath : L.LatLngTuple[], map: L.Map) {
    
    const betDistanceVehicles = Math.floor((routePath.length * 10) / vehicleNumber);
    let nearestStartpointIndex = - 1;
    
    if (vehicleState[vehicleIndex].startPointIndex !== 0) {
      nearestStartpointIndex = Math.floor((betDistanceVehicles * vehicleIndex)/ 10)
    } else {
      nearestStartpointIndex = 0;
    }
    
    if (nearestStartpointIndex > routePath.length - 1) nearestStartpointIndex = routePath.length - 1;
    const totalDistance = routePath.reduce((acc, point, index) => {
      if (index <= nearestStartpointIndex) return acc;
      if (index === 0) return acc;
      return acc + map.distance(L.latLng(routePath[index - 1]), L.latLng(point));
    }, 0);
    return {
      totalDistance,
      nearestStartpointIndex
    };
  }

  useEffect(() => {
    if (!isVehicleAdded) {
      startAddingVehicles();
      setIsVehicleAdded(true);
    }
  }, [])

  useEffect(() => {
    if (!map) return;

    const plan = new L.Routing.Plan(stops.map((stop) => L.latLng(stop.coordinates)), {
      createMarker: (i, waypoint) => {
        return L.marker(waypoint.latLng, {
          draggable: false,
          icon: customDivIcon(markerColor, stops[i].stopNumber),
        });
      },
      routeWhileDragging: false,
      addWaypoints: false,
    });

    const routingControl = L.Routing.control({
      plan,
      routeWhileDragging: false,
      addWaypoints: false,
      lineOptions: {
        styles: [{ color: lineColor }],
        extendToWaypoints: true,
        missingRouteTolerance: 0,
      },
      waypointMode: 'snap',
    })
    .on('routesfound', function (e) {
      const route = e.routes[0];
      const path = route.coordinates.map((coord: { lat: number; lng: number; }) => [coord.lat, coord.lng] as L.LatLngTuple);
      const interpolatedPath = interpolatePoints(path, 10); // Interpolate every 10 meters
      setRoutePath(interpolatedPath);
    })
    .addTo(map);
    return () => {
      map.removeControl(routingControl);
    };
  }, [map, stops, lineColor, markerColor]);

  useEffect(() => {
    if (routePath.length === 0 || vehicleState.length === 0) return;
    for (const [i, vehicle] of vehicleState.entries()) {
      if (!vehicle.finishRoute) continue;
        setVehicleState((prevState) => {
          const newState = [...prevState];
          newState[i] = {
            ...vehicle,
            finishRoute: false
          };
          return newState;
        });
        const speed = 1000 * 1000 / 3600; // 60 km/h in meters per millisecond
        if (vehicle.vehicleMarker) {
          animateVehicle(i, routePath, speed);
        } else {
          const initialMarker = L.marker(stops[vehicle.startPointIndex].coordinates, {
            icon: customDivIcon(markerColor, 'V'),
          }).addTo(map);
          
          setVehicleState((prevState) => {
            const newState = [...prevState];
            newState[i] = {
              ...vehicle,
              vehicleMarker: initialMarker,
            };
            return newState;
          });
    
          animateVehicle(i, routePath,  speed);
        
      }
      
    }
  }, [routePath, vehicleState, isVehicleAdded]);
  

  return null;
};

export default StaticRoutingMachine;
