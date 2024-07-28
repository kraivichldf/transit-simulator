import { useMapEvents } from "react-leaflet";


const MapClickHandler = ({ onClick }: { onClick: (e: L.LeafletMouseEvent) => void }) => {
  useMapEvents({
    click: onClick,
  });
  return null;
};

export default MapClickHandler;