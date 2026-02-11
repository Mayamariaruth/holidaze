import VenueCard from '../../components/cards/VenueCard';
import { useVenues } from '../../hooks/useVenues';
import heroImage from '../../assets/images/venue-hero.jpg';

export default function Venues() {
  const { venues, isLoading, isError } = useVenues();

  if (isLoading) return <p>Loading venues...</p>;
  if (isError) return <p>Failed to load venues</p>;

  return (
    <>
      {/* Hero section */}
      <section className="venue-hero" style={{ backgroundImage: `url(${heroImage})` }}></section>

      <div className="container">
        {/* Search/Filter */}
        <section>
          <div>
            {/* Search form */}
            <form>
              <input placeholder="Location" />
              <input placeholder="Check-in / Check-out" />
              <input placeholder="Guests" />
              <button type="button" className="btn-cta">
                Search
              </button>
            </form>
          </div>

          {/* Filter tabs */}
          <div>
            {/* Rating */}
            <div className="dropdown">
              <button className="dropdown-toggle" data-bs-toggle="dropdown">
                Rating
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button className="dropdown-item">Any</button>
                </li>
                <li>
                  <button className="dropdown-item">★ & up</button>
                </li>
                <li>
                  <button className="dropdown-item">★★ & up</button>
                </li>
                <li>
                  <button className="dropdown-item">★★★ & up</button>
                </li>
                <li>
                  <button className="dropdown-item">★★★★ & up</button>
                </li>
                <li>
                  <button className="dropdown-item">★★★★★</button>
                </li>
              </ul>
            </div>

            {/* Price */}
            <div className="dropdown">
              <button className="dropdown-toggle" data-bs-toggle="dropdown">
                Price
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button className="dropdown-item">Any</button>
                </li>
                <li>
                  <button className="dropdown-item">Under $100</button>
                </li>
                <li>
                  <button className="dropdown-item">$100 – $300</button>
                </li>
                <li>
                  <button className="dropdown-item">$300+</button>
                </li>
              </ul>
            </div>

            {/* Amenities */}
            <div className="dropdown">
              <button className="dropdown-toggle" data-bs-toggle="dropdown">
                Amenities
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button className="dropdown-item">WiFi</button>
                </li>
                <li>
                  <button className="dropdown-item">Parking</button>
                </li>
                <li>
                  <button className="dropdown-item">Pool</button>
                </li>
                <li>
                  <button className="dropdown-item">Breakfast</button>
                </li>
                <li>
                  <button className="dropdown-item">Gym</button>
                </li>
                <li>
                  <button className="dropdown-item">Spa</button>
                </li>
                <li>
                  <button className="dropdown-item">TV</button>
                </li>
                <li>
                  <button className="dropdown-item">Pet friendly</button>
                </li>
                <li>
                  <button className="dropdown-item">Wheelchair accessible</button>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Venues list */}
        <section className="venue-list-container">
          <div className="venues-grid">
            {venues.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
