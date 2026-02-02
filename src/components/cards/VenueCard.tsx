import type { Venue } from '../../types/venue.types';

interface Props {
  venue: Venue;
}

const VenueCard = ({ venue }: Props) => {
  return (
    <div className="venue-card">
      <div>
        <img
          height={100}
          src={venue.media?.[0]?.url || 'src/assets/images/placeholder.jpg'}
          alt={venue.media?.[0]?.alt || venue.name}
        />
      </div>
      <div>
        <h3>{venue.name}</h3>
        <i className="fa-regular fa-heart"></i>
      </div>
      <p>
        {venue.location.city}, {venue.location.country}
      </p>
      <div>{venue.rating || 'No ratings'}</div>
      <p>${venue.price}/night</p>
    </div>
  );
};

export default VenueCard;
