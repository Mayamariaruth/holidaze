import { Link } from 'react-router-dom';

export default function VenueDetail() {
  return (
    <>
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb mb-4">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/venues">Venues</Link>
          <span>/</span>
          <span className="active">{venue.name}</span>
        </nav>

        {/* Venue details */}
        <section className="venue-details-container">
          {/* Venue title section */}
          <div className="d-flex flex-column align-items-center gap-3 mb-4">
            <h1 className="mb-1">{venue.name}</h1>
            <div className="text-warning">{venue.rating}</div>
            <span className="text-muted">
              {venue.location.city}, {venue.location.country}
            </span>
          </div>

          {/* Venue image gallery */}
          <div className="row g-3 mb-4">
            <div className="col-12 col-md-8">
              <img src={venue.media[0]?.url} className="img-fluid w-100" />
            </div>

            <div className="col-12 col-md-4">
              <div className="row g-2">
                {venue.media.slice(1, 5).map((img: any) => (
                  <div className="col-6" key={img.url}>
                    <img src={img.url} className="img-fluid" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Edit/Save buttons */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            {role === 'venue_manager' ? (
              <button className="btn btn-primary">Edit</button>
            ) : (
              <button className="">
                <i class="fa-regular fa-heart"></i>
                Save
              </button>
            )}

            <span>
              Managed by <strong>{venue.owner.name}</strong>
            </span>
          </div>

          {/* Description */}
          <div>
            <p className="mb-4">{venue.description}</p>
          </div>
          <div className="row g-5">
            {/* Left - Amenities */}
            <div className="col-12 col-lg-7">
              <h2 className="h3">Amenities</h2>

              <ul className="list-unstyled row">
                {['wifi', 'parking', 'breakfast', 'pets'].map((amenity) => {
                  const hasAmenity = venue.meta[amenity];

                  return (
                    <li key={amenity} className="col-6 mb-2">
                      <span className={hasAmenity ? 'text-success' : 'text-danger'}>
                        {hasAmenity ? '✔' : '✕'}
                      </span>{' '}
                      {amenity}
                    </li>
                  );
                })}
              </ul>

              {/* Location */}
              <div>
                <h2 className="h3 mt-5">Location</h2>
                <div className="map-placeholder rounded-4 mb-3">{/* Map */}</div>
                <div>
                  <p>
                    {venue.name},{venue.location.address}, {venue.location.city},{' '}
                    {venue.location.postcode} {venue.location.country}
                  </p>
                </div>
              </div>
            </div>

            {/* Right - Booking form */}
            <div className="col-12 col-lg-5">
              <div className="border p-4 sticky-top">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="h3">Availability</h2>
                  <span className="text-muted">Max {venue.maxGuests} guests</span>
                </div>
                <form>
                  <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Check in – Check out"
                    readOnly
                    onClick={() => setShowCalendar(true)}
                  />

                  <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Guests"
                    min={1}
                    max={venue.maxGuests}
                  />
                  <p className="text-muted small">
                    Select your dates and number of guests to check availability and complete your
                    booking.
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-4">
                    <strong>${venue.price}/night</strong>

                    <button className="btn btn-cta">Book</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
