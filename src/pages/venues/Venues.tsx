import VenueCardList from '../../components/cards/VenueCardList';
import { useVenues } from '../../hooks/useVenues';
import heroImage from '../../assets/images/venue-hero.jpg';

export default function Venues() {
  const { venues, isLoading, isError } = useVenues();

  if (isLoading) return <p>Loading venues...</p>;
  if (isError) return <p>Failed to load venues</p>;

  return (
    <>
      {/* Hero section */}
      <section className="venue-hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-overlay"></div>
      </section>

      <div className="container">
        <section className="venue-controls">
          {/* Search form */}
          <form className="search-bar rounded-4">
            <input type="text" className="form-control" placeholder="Location" />
            <input type="text" className="form-control" placeholder="Check-in" />
            <input type="text" className="form-control" placeholder="Check-out" />
            <input type="number" className="form-control" placeholder="Guests" />
            <button type="button" className="btn btn-cta btn-search">
              Search
            </button>
          </form>

          {/* Filters */}
          <div className="mt-5 d-flex gap-1">
            <div className="dropdown filter-dropdown">
              <button className="dropdown-toggle" data-bs-toggle="dropdown">
                <i className="fa-regular fa-star me-2"></i> Rating
              </button>
              <ul className="dropdown-menu">...</ul>
            </div>

            <div className="dropdown filter-dropdown">
              <button className="dropdown-toggle" data-bs-toggle="dropdown">
                <i className="fa-solid fa-dollar-sign me-2"></i> Price
              </button>
              <ul className="dropdown-menu">...</ul>
            </div>

            <div className="dropdown filter-dropdown">
              <button className="dropdown-toggle" data-bs-toggle="dropdown">
                <i className="fa-solid fa-wifi me-2"></i> Amenities
              </button>
              <ul className="dropdown-menu">...</ul>
            </div>
          </div>
        </section>

        {/* Venues list */}
        <section>
          <div className="venues-grid">
            {venues.map((venue) => (
              <VenueCardList key={venue.id} venue={venue} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
