import { Link } from 'react-router-dom';
import type { Venue } from '../../types/venue.types';
import placeholder from '../../assets/images/placeholder.jpg';

interface Props {
  venue: Venue;
}

export default function VenueCardList({ venue }: Props) {
  return (
    <Link to={`/venues/${venue.id}`} className="venue-card-list text-decoration-none text-dark">
      <div>
        <img src={venue.media?.[0]?.url || placeholder} alt={venue.media?.[0]?.alt || venue.name} />
      </div>
      <div className="px-3 pt-2 pb-3">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">{venue.name}</h4>
          <i className="fa-regular fa-heart"></i>
        </div>
        <p className="text-neutral mt-1 mb-1">
          {venue.location.city}, {venue.location.country}
        </p>
        <div className="fw-semibold">
          {venue.rating !== undefined ? `⭐ ${venue.rating}/5` : 'No ratings'}
        </div>
        <p className="fw-medium mb-0 mt-1">${venue.price}/night</p>
      </div>
    </Link>
  );
}
