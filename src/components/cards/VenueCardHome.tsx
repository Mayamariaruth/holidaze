import { Link } from 'react-router-dom';
import type { Venue } from '../../types/venue.types';
import placeholder from '../../assets/images/placeholder.jpg';

interface Props {
  venue: Venue;
}

/**
 * A component to display a venue for the homepage.
 *
 * It shows the venue's name, location, rating, and price per night, and links to the venue details page.
 *
 * @param {Object} props The props for the venue card.
 * @param {Venue} props.venue The venue object containing the venue details such as name, location, rating, and price.
 * @returns {JSX.Element} The rendered venue card component.
 *
 * @example
 * <VenueCardHome venue={venue} />
 */
export default function VenueCardHome({ venue }: Props) {
  return (
    <Link to={`/venues/${venue.id}`} className="venue-card-home text-decoration-none text-dark">
      <div>
        {/* Image */}
        <img src={venue.media?.[0]?.url || placeholder} alt={venue.media?.[0]?.alt || venue.name} />
      </div>
      <div className="px-3 pt-2">
        {/* Title */}
        <h4 className="mb-0">{venue.name}</h4>
        {/* Location */}
        <p className="text-neutral mt-1 mb-1">
          {venue.location.city}, {venue.location.country}
        </p>
        {/* Rating */}
        <div className="fw-bold">
          {venue.rating !== undefined ? `⭐ ${venue.rating}/5` : 'No ratings'}
        </div>
        {/* Price */}
        <p className="fw-medium mb-0 mt-1">${venue.price}/night</p>
      </div>
    </Link>
  );
}
