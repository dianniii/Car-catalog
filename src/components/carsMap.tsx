'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { LatLngTuple } from 'leaflet';

// иконки
const DefaultIcon = L.icon({
  iconUrl: 'https://images.icon-icons.com/317/PNG/512/map-marker-icon_34392.png',
  iconRetinaUrl: 'https://images.icon-icons.com/317/PNG/512/map-marker-icon_34392.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [52, 52],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

interface CarsMapProps {
  markers: {
    position: LatLngTuple;
    carInfo: string;
  }[];
}

export default function CarsMap({ markers }: CarsMapProps) {
  if (markers.length === 0) {
    return <div className="h-full w-full bg-gray-100 flex items-center justify-center">No cars to display</div>;
  }

  // Вычисляем средние координаты для центра карты
  const centerLat = markers.reduce((sum, marker) => sum + marker.position[0], 0) / markers.length;
  const centerLng = markers.reduce((sum, marker) => sum + marker.position[1], 0) / markers.length;
  const center: LatLngTuple = [centerLat, centerLng];

  return (
    <MapContainer 
      center={center} 
      zoom={10} 
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position}>
          <Popup>{marker.carInfo}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}