export default function CreateVenue() {
  return (
    <>
      <div
        className="modal fade"
        id="create-venue-modal"
        aria-labelledby="create-venue-modal-label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-3">
            <div className="modal-header">
              <h2 className="modal-title" id="create-venue-modal-label">
                Create new venue
              </h2>
              <button type="button" data-bs-dismiss="modal">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <hr />
            {/* Form */}
            <div className="modal-body">
              <form id="create-venue-form" noValidate>
                {/* Name field */}
                <div className="mb-3">
                  <label htmlFor="venue-name" className="form-label">
                    Venue name*
                  </label>
                  <input />
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label htmlFor="venue-description" className="form-label">
                    Description
                  </label>
                  <input />
                </div>

                {/* Price and capacity */}
                <div className="mb-3">
                  <label htmlFor="venue-price-cap" className="form-label">
                    Price and capacity*
                  </label>
                  <div>
                    <p>Price/night (USD)</p>
                    <input />
                  </div>
                  <div>
                    <p>Max guests</p>
                    <input />
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-3">
                  <label htmlFor="venue-amenities" className="form-label">
                    Amenities*
                  </label>
                  <div>
                    <p>Wi-Fi</p>
                    <input type="radio" />
                  </div>
                  <div>
                    <p>Parking</p>
                    <input type="radio" />
                  </div>
                  <div>
                    <p>Breakfast</p>
                    <input type="radio" />
                  </div>
                  <div>
                    <p>Gym</p>
                    <input type="radio" />
                  </div>
                  <div>
                    <p>TV</p>
                    <input type="radio" />
                  </div>
                  <div>
                    <p>Wheelchair accessible</p>
                    <input type="radio" />
                  </div>
                  <div>
                    <p>Pool</p>
                    <input type="radio" />
                  </div>
                  <div>
                    <p>Spa</p>
                    <input type="radio" />
                  </div>
                  <div>
                    <p>Pet friendly</p>
                    <input type="radio" />
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-3">
                  <label htmlFor="venue-rating" className="form-label">
                    Rating*
                  </label>
                  <div className="create-stars-container">
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                    <i className="fa-regular fa-star"></i>
                  </div>
                </div>

                {/* Location */}
                <div className="mb-3">
                  <label htmlFor="venue-location" className="form-label">
                    Location*
                  </label>
                  <div>
                    <p>Address</p>
                    <input />
                  </div>
                  <div>
                    <p>Postcode</p>
                    <input />
                    <p>City</p>
                    <input />
                  </div>
                  <div>
                    <p>Country</p>
                    <input />
                  </div>
                </div>

                {/* Images */}
                <div className="mb-3">
                  <label htmlFor="venue-img" className="form-label">
                    Image URLs*
                  </label>
                  <input />
                  <div className="add-img-btn">
                    <i className="fa-solid fa-square-plus"></i>
                    <p>Add more images</p>
                  </div>
                </div>

                <hr />
                {/* Buttons */}
                <div className="d-flex flex-column gap-2 mt-4">
                  <button type="submit">Confirm</button>
                  <button type="button" data-bs-dismiss="modal">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
