import { useEffect, useRef, useState, useCallback } from 'react';
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
  speedKmh?: number; // Optional speed in km/h (default: 60)
}

interface Vehicle {
  id: number;
  progress: number; // 0 to 1 representing position along the route
  offset: number; // Starting offset for this vehicle (0-1)
}

const StaticRoutingMachine: React.FC<RoutingProps> = ({ 
  stops, 
  lineColor, 
  markerColor, 
  vehicleNumber,
  speedKmh = 20 // Default speed reduced to 20 km/h for better visualization
}) => {
  const map = useMap();
  const [routePath, setRoutePath] = useState<L.LatLngTuple[]>([]);
  const vehiclesRef = useRef<Vehicle[]>([]);
  const vehicleMarkersRef = useRef<L.Marker[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const totalDistanceRef = useRef<number>(0);

  const customDivIcon = (name: string, number: number | string) => {
    return L.divIcon({
      className: `${name}-div-icon`,
      iconSize: [25, 25],
      popupAnchor: [0, 0],
      html: `<div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; background-color: ${markerColor}; color: white; border-radius: 50%; font-weight: bold; font-size: 14px;">${number}</div>`,
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

  const getPositionAtProgress = useCallback((progress: number): L.LatLngTuple => {
    if (routePath.length === 0) return [0, 0];
    if (progress <= 0) return routePath[0];
    if (progress >= 1) return routePath[routePath.length - 1];

    const totalSegments = routePath.length - 1;
    const currentSegment = Math.floor(progress * totalSegments);
    const segmentProgress = (progress * totalSegments) - currentSegment;

    const start = L.latLng(routePath[currentSegment]);
    const end = L.latLng(routePath[Math.min(currentSegment + 1, routePath.length - 1)]);

    return [
      start.lat + segmentProgress * (end.lat - start.lat),
      start.lng + segmentProgress * (end.lng - start.lng),
    ];
  }, [routePath]);

  const animate = useCallback((time: number) => {
    if (routePath.length === 0 || vehicleMarkersRef.current.length === 0) {
      animationFrameRef.current = requestAnimationFrame(animate);
      return;
    }

    if (startTimeRef.current === 0) startTimeRef.current = time;

    // Speed in m/s
    const speedMs = (speedKmh * 1000) / 3600;
    
    // Progress increment per second (1 = full route)
    const progressPerSecond = totalDistanceRef.current > 0 ? speedMs / totalDistanceRef.current : 0;

    vehiclesRef.current.forEach((vehicle, index) => {
      // Calculate new progress (looping)
      let newProgress = (vehicle.progress + progressPerSecond) % 1;
      
      // Update marker position
      if (vehicleMarkersRef.current[index]) {
        const newPosition = getPositionAtProgress(newProgress);
        vehicleMarkersRef.current[index].setLatLng(newPosition);
      }

      vehicle.progress = newProgress;
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [routePath, speedKmh, getPositionAtProgress]);

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
      
      // Calculate total distance once route is found
      let totalDistance = 0;
      for (let i = 1; i < interpolatedPath.length; i++) {
        totalDistance += map.distance(L.latLng(interpolatedPath[i - 1]), L.latLng(interpolatedPath[i]));
      }
      totalDistanceRef.current = totalDistance;
    })
    .addTo(map);

    return () => {
      map.removeControl(routingControl);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      vehicleMarkersRef.current.forEach(marker => map.removeLayer(marker));
      vehicleMarkersRef.current = [];
    };
  }, [map, stops, lineColor, markerColor]);

  useEffect(() => {
    if (routePath.length === 0) return;

    // Initialize vehicles with evenly spaced offsets
    vehiclesRef.current = Array.from({ length: vehicleNumber }, (_, i) => ({
      id: i,
      progress: i / vehicleNumber, // Evenly distribute vehicles along the route
      offset: i / vehicleNumber
    }));

    // Create vehicle markers
    vehicleMarkersRef.current = vehiclesRef.current.map((vehicle) => {
      const initialPosition = getPositionAtProgress(vehicle.progress);
      return L.marker(initialPosition, {
        icon: customDivIcon(markerColor, 'V'),
      }).addTo(map);
    });

    // Reset timing and start animation
    startTimeRef.current = 0;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      vehicleMarkersRef.current.forEach(marker => map.removeLayer(marker));
      vehicleMarkersRef.current = [];
    };
  }, [routePath, vehicleNumber, map, markerColor, getPositionAtProgress, animate]);

  return null;
};

export default StaticRoutingMachine;
