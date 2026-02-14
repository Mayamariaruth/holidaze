import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import VenueCardList from '../../components/cards/VenueCardList';
import Calendar from '../../components/modals/Calendar';
import { useVenues } from '../../hooks/useVenues';
import { useSearch } from '../../hooks/useSearch';
import heroImage from '../../assets/images/venue-hero.jpg';

export default function Venues() {
  const { venues, isLoading, isError } = useVenues();
  const location = useLocation();
  const params = Object.fromEntries(new URLSearchParams(location.search));

  // Local form state (prefilled from URL)
  const [locationInput, setLocationInput] = useState(params.location || '');
  const [guestsInput, setGuestsInput] = useState(params.guests ? Number(params.guests) : '');
  const [dateFromInput, setDateFromInput] = useState(
    params.dateFrom ? new Date(params.dateFrom) : null
  );
  const [dateToInput, setDateToInput] = useState(params.dateTo ? new Date(params.dateTo) : null);

  const { handleChange, searchResults } = useSearch(venues);

  // Filters
  const [minRating, setMinRating] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [amenitiesFilter, setAmenitiesFilter] = useState<string[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Search button handler
  const onSearch = () => {
    handleChange('location', locationInput);
    handleChange('guests', guestsInput ? Number(guestsInput) : null);
    handleChange('dateFrom', dateFromInput);
    handleChange('dateTo', dateToInput);
    setCurrentPage(1);
  };

  // Toggle amenities
  const toggleAmenity = (amenity: string) => {
    setAmenitiesFilter((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
    setCurrentPage(1);
  };

  // Apply filters on searchResults
  let filteredVenues = searchResults;

  if (minRating) {
    filteredVenues = filteredVenues.filter((v) => (v.rating ?? 0) >= minRating);
    filteredVenues.sort((a, b) => (a.rating ?? 0) - (b.rating ?? 0));
  }

  if (maxPrice) filteredVenues = filteredVenues.filter((v) => v.price <= maxPrice);

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

  // Pagination
  const totalPages = Math.ceil(filteredVenues.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentVenues = filteredVenues.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      {isLoading && <p>Loading venues...</p>}
      {isError && <p>Failed to load venues</p>}

      {!isLoading && !isError && (
        <div>
          <section className="venue-hero" style={{ backgroundImage: `url(${heroImage})` }}>
            <div className="hero-overlay"></div>
          </section>

          <div className="container mb-5">
            {/* Search Form */}
            <section className="venue-controls">
              <form
                className="search-bar rounded-4 mb-5 box-shadow"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  className="form-control flex-fill"
                  placeholder="Location"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Check-in"
                  readOnly
                  value={dateFromInput ? dateFromInput.toLocaleDateString() : ''}
                  onClick={() => setShowCalendar(true)}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Check-out"
                  readOnly
                  value={dateToInput ? dateToInput.toLocaleDateString() : ''}
                  onClick={() => setShowCalendar(true)}
                />
                <input
                  className="form-control"
                  placeholder="Guests"
                  type="number"
                  value={guestsInput ?? ''}
                  onChange={(e) => setGuestsInput(Number(e.target.value))}
                />
                <button className="btn btn-cta px-4" type="button" onClick={onSearch}>
                  Search
                </button>
              </form>

              {showCalendar && (
                <Calendar
                  bookings={[]}
                  onClose={() => setShowCalendar(false)}
                  onSelectRange={(from, to) => {
                    setDateFromInput(from);
                    setDateToInput(to);
                    setShowCalendar(false);
                  }}
                />
              )}

              {/* Filters */}
              <div className="mt-2 d-flex flex-column flex-md-row gap-3">
                {/* Rating */}
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle className="btn btn-filters">
                    <i className="fa-regular fa-star me-1"></i> Rating
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
                    <Dropdown.Item onClick={() => setMinRating(null)}>Clear</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                {/* Price */}
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle className="btn btn-filters">
                    <i className="fa-solid fa-dollar-sign me-1"></i> Price
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
                    <Dropdown.Item onClick={() => setMaxPrice(null)}>Clear</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                {/* Amenities */}
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle className="btn btn-filters">
                    <i className="fa-solid fa-wifi me-1"></i> Amenities
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

            {/* Venues List */}
            <section>
              <div className="venues-grid">
                {currentVenues.map((venue) => (
                  <VenueCardList key={venue.id} venue={venue} />
                ))}
              </div>

              {filteredVenues.length === 0 && (
                <p className="mt-3 text-center text-muted">
                  No venues match your filters. Try changing your search or clearing some filters.
                </p>
              )}

              {/* Pagination */}
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
