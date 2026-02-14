import { useState } from 'react';
import VenueCardList from '../../components/cards/VenueCardList';
import { useVenues } from '../../hooks/useVenues';
import heroImage from '../../assets/images/venue-hero.jpg';
import { Dropdown, ButtonGroup } from 'react-bootstrap';

export default function Venues() {
  const { venues, isLoading, isError } = useVenues();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filter state
  const [minRating, setMinRating] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [amenitiesFilter, setAmenitiesFilter] = useState<string[]>([]);

  // Apply filters
  // Start with all venues
  let filteredVenues = venues;

  // Rating filter
  if (minRating) {
    filteredVenues = filteredVenues
      .filter((v) => (v.rating ?? 0) >= minRating)
      .sort((a, b) => (a.rating ?? 0) - (b.rating ?? 0));
  }

  // Price filter
  if (maxPrice) {
    filteredVenues = filteredVenues.filter((v) => v.price <= maxPrice);
  }

  // Amenities filter
  if (amenitiesFilter.length > 0) {
    filteredVenues = filteredVenues.filter((v) => {
      if (!v.meta) return false;
      return amenitiesFilter.every((a) => {
        if (a === 'Wi-Fi') return v.meta.wifi;
        if (a === 'Parking') return v.meta.parking;
        if (a === 'Breakfast') return v.meta.breakfast;
        if (a === 'Pets') return v.meta.pets;
        return false;
      });
    });
  }

  // Pagination logic
  const totalPages = Math.ceil(filteredVenues.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentVenues = filteredVenues.slice(startIndex, startIndex + itemsPerPage);

  const toggleAmenity = (amenity: string) => {
    setAmenitiesFilter((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
    setCurrentPage(1);
  };

  return (
    <>
      {isLoading && <p>Loading venues...</p>}
      {isError && <p>Failed to load venues</p>}
      {!isLoading && !isError && (
        <div>
          {/* Hero section */}
          <section className="venue-hero" style={{ backgroundImage: `url(${heroImage})` }}>
            <div className="hero-overlay"></div>
          </section>

          <div className="container mb-5">
            {/* Search form */}
            <section className="venue-controls">
              <form className="search-bar rounded-4 mb-5 box-shadow">
                <input type="text" className="form-control" placeholder="Location" />
                <input type="text" className="form-control" placeholder="Check-in" />
                <input type="text" className="form-control" placeholder="Check-out" />
                <input type="number" className="form-control" placeholder="Guests" />
                <button type="button" className="btn btn-cta btn-search">
                  Search
                </button>
              </form>

              <div className="mt-2 d-flex flex-column flex-md-row gap-3">
                {/* Rating filter */}
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle className="btn btn-filters">
                    <div>
                      <i className="fa-regular fa-star me-1"></i> Rating
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu-custom">
                    {[1, 2, 3, 4, 5].map((r) => (
                      <Dropdown.Item
                        key={r}
                        active={minRating === r}
                        onClick={() => {
                          setMinRating(r);
                          setCurrentPage(1);
                        }}
                      >
                        {r} ⭐ & up
                      </Dropdown.Item>
                    ))}
                    <Dropdown.Item
                      onClick={() => {
                        setMinRating(null);
                        setCurrentPage(1);
                      }}
                    >
                      Clear
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                {/* Price filter */}
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle className="btn btn-filters">
                    <div>
                      <i className="fa-solid fa-dollar-sign me-1"></i> Price
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu-custom">
                    {[50, 100, 200, 500].map((price) => (
                      <Dropdown.Item
                        key={price}
                        active={maxPrice === price}
                        onClick={() => {
                          setMaxPrice(price);
                          setCurrentPage(1);
                        }}
                      >
                        Up to ${price}
                      </Dropdown.Item>
                    ))}
                    <Dropdown.Item
                      onClick={() => {
                        setMaxPrice(null);
                        setCurrentPage(1);
                      }}
                    >
                      Clear
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                {/* Amenities filter */}
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle className="btn btn-filters">
                    <div>
                      <i className="fa-solid fa-wifi me-1"></i> Amenities
                    </div>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu-custom">
                    {['Wi-Fi', 'Parking', 'Breakfast', 'Pets'].map((amenity) => (
                      <Dropdown.Item
                        key={amenity}
                        onClick={() => toggleAmenity(amenity)}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <span>{amenity}</span>
                        {amenitiesFilter.includes(amenity) && (
                          <i className="fa-solid fa-check text-success"></i>
                        )}
                      </Dropdown.Item>
                    ))}
                    <Dropdown.Item onClick={() => setAmenitiesFilter([])}>Clear All</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </section>

            {/* Venues list */}
            <section>
              <div className="venues-grid">
                {currentVenues.map((venue) => (
                  <VenueCardList key={venue.id} venue={venue} />
                ))}
              </div>

              {/* No venues message */}
              {filteredVenues.length === 0 && (
                <p className="mt-3 text-center text-muted">
                  No venues match your filters. Try changing your search or clearing some filters.
                </p>
              )}

              {/* Pagination buttons */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-center gap-2 mt-5">
                  <button
                    className="btn btn-outline-primary btn-pag"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                  >
                    Previous
                  </button>
                  <span className="align-self-center">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className="btn btn-primary btn-pag"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                  >
                    Next
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      )}
    </>
  );
}
