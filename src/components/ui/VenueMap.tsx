import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { Location } from '../../types/venue.types';
import L from 'leaflet';

L.Icon.Default.mergeOptions({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
});

interface Props {
  location: Location;
  name: string;
  fallbackCoords?: [number, number];
}

// Default fallback location
const defaultFallback: [number, number] = [40.7128, -74.006];

export default function VenueMap({ name, location, fallbackCoords = defaultFallback }: Props) {
  // Check if lat/lon are valid numbers
  const lat =
    typeof location.lat === 'number' && !isNaN(location.lat) && location.lat !== 0
      ? location.lat
      : fallbackCoords[0];
  const lon =
    typeof location.long === 'number' && !isNaN(location.long) && location.long !== 0
      ? location.long
      : fallbackCoords[1];

  return (
    <MapContainer
      center={[lat, lon]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '300px', width: '100%' }}
      className="rounded-4 mb-3"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />
      <Marker position={[lat, lon]}>
        <Popup>{name}</Popup>
      </Marker>
    </MapContainer>
  );
}
