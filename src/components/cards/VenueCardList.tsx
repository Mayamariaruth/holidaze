import { Link } from 'react-router-dom';
import type { Venue } from '../../types/venue.types';
import placeholder from '../../assets/images/placeholder.jpg';

interface Props {
  venue: Venue;
}

/**
 * A component to display a venue for the venue listings page.
 *
 * It shows the venue's name, location, rating, price per night, and a link to the venue details page.
 *
 * @param {Object} props The props for the venue card.
 * @param {Venue} props.venue The venue object containing the venue details such as name, location, rating, and price.
 * @returns {JSX.Element} The rendered venue card component.
 *
 * @example
 * <VenueCardList venue={venue} />
 */
export default function VenueCardList({ venue }: Props) {
  return (
    <Link to={`/venues/${venue.id}`} className="venue-card-list text-decoration-none text-dark">
      <div>
        {/* Image */}
        <img src={venue.media?.[0]?.url || placeholder} alt={venue.media?.[0]?.alt || venue.name} />
      </div>
      <div className="px-3 pt-2 pb-3">
        {/* Title */}
        <h4 className="mb-0">{venue.name}</h4>

        {/* Location */}
        <p className="text-neutral mt-1 mb-1">
          {venue.location &&
          (venue.location.city ||
            venue.location.country ||
            venue.location.address ||
            venue.location.zip)
            ? [
                venue.location.address,
                venue.location.city,
                venue.location.zip,
                venue.location.country,
              ]
                .filter(Boolean)
                .join(', ')
            : 'No location available'}
        </p>

        {/* Rating */}
        <div className="fw-semibold">
          {venue.rating !== undefined ? `⭐ ${venue.rating}/5` : 'No ratings'}
        </div>

        {/* Price */}
        <p className="fw-medium mb-0 mt-1">${venue.price}/night</p>
      </div>
    </Link>
  );
}
