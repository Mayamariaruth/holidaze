import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { Location } from '../../types/venue.types';

/**
 * VenueMap component to display a map for a venue location.
 *
 * Uses Leaflet via react-leaflet and falls back to default coordinates if the location is invalid.
 *
 * @param {Object} props Component props
 * @param {Location} props.location Venue latitude and longitude
 * @param {string} props.name Venue name to display in popup
 * @param {[number, number]} [props.fallbackCoords] Optional fallback coordinates if venue location is invalid
 * @returns {JSX.Element} Leaflet map element with marker
 *
 * @example
 * <VenueMap name="Luxury Villa" location={{ lat: 40.7, long: -74.0 }} />
 */
interface Props {
  location: Location;
  name: string;
  fallbackCoords?: [number, number];
}

// Default fallback coordinates (New York City)
const defaultFallback: [number, number] = [40.7128, -74.006];

export default function VenueMap({ name, location, fallbackCoords = defaultFallback }: Props) {
  // Validate latitude/longitude or use fallback
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
      {/* Tile layer for map */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
      />

      {/* Marker with popup */}
      <Marker position={[lat, lon]}>
        <Popup>{name}</Popup>
      </Marker>
    </MapContainer>
  );
}
