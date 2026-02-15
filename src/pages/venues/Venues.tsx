import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import VenueCardList from '../../components/cards/VenueCardList';
import Calendar from '../../components/modals/Calendar';
import { useVenues } from '../../hooks/useVenues';
import { useSearch } from '../../hooks/useSearch';
import heroImage from '../../assets/images/venue-hero.jpg';
import Loader from '../../components/ui/Loader';

/**
 * Venues page - displays a searchable, filterable, and paginated list of venues.
 *
 * Features:
 * - Search by location, dates, and number of guests
 * - Filter by rating, price, and amenities
 * - Paginated results with 12 venues per page
 * - Calendar modal for selecting check-in/out dates
 *
 * @returns {JSX.Element} Venues page component
 */
export default function Venues() {
  // Fetch all venues from API, refetches on route change
  const { venues, isLoading, isError } = useVenues();

  // Get URL search params for pre-filling search
  const location = useLocation();
  const params = useMemo(
    () => Object.fromEntries(new URLSearchParams(location.search)),
    [location.search]
  );

  // Custom search hook: filters venues based on location, dates, guests
  const { searchParams, handleChange, searchResults } = useSearch(venues, {
    location: params.location || '',
    guests: params.guests ? Number(params.guests) : null,
    dateFrom: params.dateFrom ? new Date(params.dateFrom) : null,
    dateTo: params.dateTo ? new Date(params.dateTo) : null,
  });

  // UI state
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [amenitiesFilter, setAmenitiesFilter] = useState<string[]>([]);

  const itemsPerPage = 12;

  /**
   * Toggle an amenity filter on/off
   * Resets to first page when changed
   */
  const toggleAmenity = (amenity: string) => {
    setAmenitiesFilter((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
    setCurrentPage(1);
  };

  // Filters
  let filteredVenues = searchResults;

  if (minRating) filteredVenues = filteredVenues.filter((v) => (v.rating ?? 0) >= minRating);
  if (maxPrice) filteredVenues = filteredVenues.filter((v) => v.price <= maxPrice);
  if (amenitiesFilter.length) {
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

  // Pagination calculation
  const totalPages = Math.ceil(filteredVenues.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentVenues = filteredVenues.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      {/* Loader overlay while fetching */}
      {isLoading && <Loader overlay size="lg" />}

      {/* Error state */}
      {!isLoading && isError && (
        <div className="text-center text-danger mt-5">Failed to load venues.</div>
      )}

      {/* Main page content */}
      {!isLoading && !isError && (
        <>
          {/* Hero section */}
          <section className="venue-hero" style={{ backgroundImage: `url(${heroImage})` }}>
            <div className="hero-overlay" />
          </section>

          <div className="container mb-5">
            {/* Search bar */}
            <section className="venue-controls">
              <form
                className="search-bar rounded-4 mb-5 box-shadow"
                onSubmit={(e) => e.preventDefault()}
              >
                {/* Location input */}
                <input
                  className="form-control"
                  placeholder="Location"
                  value={searchParams.location}
                  onChange={(e) => {
                    handleChange('location', e.target.value);
                    setCurrentPage(1);
                  }}
                />

                {/* Check-in date input */}
                <input
                  className="form-control"
                  placeholder="Check-in"
                  value={searchParams.dateFrom?.toLocaleDateString() ?? ''}
                  readOnly
                  onClick={() => setShowCalendar(true)}
                />

                {/* Check-out date input */}
                <input
                  className="form-control"
                  placeholder="Check-out"
                  value={searchParams.dateTo?.toLocaleDateString() ?? ''}
                  readOnly
                  onClick={() => setShowCalendar(true)}
                />

                {/* Guests input */}
                <input
                  className="form-control"
                  placeholder="Guests"
                  type="number"
                  value={searchParams.guests ?? ''}
                  onChange={(e) => {
                    handleChange('guests', e.target.value ? Number(e.target.value) : null);
                    setCurrentPage(1);
                  }}
                />
              </form>

              {/* Calendar modal */}
              {showCalendar && (
                <Calendar
                  bookings={[]}
                  onClose={() => setShowCalendar(false)}
                  onSelectRange={(from, to) => {
                    handleChange('dateFrom', from);
                    handleChange('dateTo', to);
                    setCurrentPage(1);
                    setShowCalendar(false);
                  }}
                />
              )}

              {/* Filters */}
              <div className="d-flex flex-wrap gap-3">
                {/* Rating filter */}
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle className="btn btn-filters">Rating</Dropdown.Toggle>
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
                  <Dropdown.Toggle className="btn btn-filters">Price</Dropdown.Toggle>
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
                  <Dropdown.Toggle className="btn btn-filters">Amenities</Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu-custom">
                    {['Wi-Fi', 'Parking', 'Breakfast', 'Pets'].map((a) => (
                      <Dropdown.Item
                        key={a}
                        onClick={() => toggleAmenity(a)}
                        className="d-flex justify-content-between"
                      >
                        {a}
                        {amenitiesFilter.includes(a) && (
                          <i className="fa-solid fa-check text-success" />
                        )}
                      </Dropdown.Item>
                    ))}
                    <Dropdown.Item onClick={() => setAmenitiesFilter([])}>Clear All</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </section>

            {/* Venue cards */}
            <section>
              <div className="venues-grid">
                {currentVenues.map((venue) => (
                  <VenueCardList key={venue.id} venue={venue} />
                ))}
              </div>

              {/* No results message */}
              {!filteredVenues.length && (
                <div className="text-center text-muted mt-4">No venues match your search.</div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-center gap-3 mt-5">
                  <button
                    className="btn btn-outline-primary"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                  >
                    Previous
                  </button>
                  <span>
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className="btn btn-primary"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                  >
                    Next
                  </button>
                </div>
              )}
            </section>
          </div>
        </>
      )}
    </>
  );
}
