import { useState } from 'react';
import type { Venue, Location, VenuePayload } from '../../types/venue.types';
import { useAuthStore } from '../../stores/auth.stores';
import { createVenue } from '../../services/venues.service';

interface Props {
  onClose: () => void;
  onCreate: (venue: Venue) => void;
}

export default function CreateVenue({ onClose, onCreate }: Props) {
  const { user } = useAuthStore();
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    price: '',
    maxGuests: '',
    amenities: [] as string[],
    rating: 0,
    location: { address: '', city: '', zip: '', country: '' } as Location,
    media: [''] as string[],
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!user) throw new Error('User not logged in');

      const newVenue: VenuePayload = {
        name: formState.name,
        description: formState.description,
        price: Number(formState.price),
        rating: formState.rating,
        maxGuests: Number(formState.maxGuests),
        meta: {
          wifi: formState.amenities.includes('Wi-Fi'),
          parking: formState.amenities.includes('Parking'),
          breakfast: formState.amenities.includes('Breakfast'),
          pets: formState.amenities.includes('Pets'),
        },
        location: {
          ...formState.location,
          continent: '',
          lat: 0,
          long: 0,
        },
        media: formState.media.filter(Boolean).map((url) => ({ url, alt: undefined })),
      };

      const created = await createVenue(user.name, newVenue);
      onCreate(created);
      onClose();
    } catch (err) {
      console.error('Failed to create venue', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal show d-block" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content p-3">
          <div className="modal-header">
            <h2 className="modal-title">Create new venue</h2>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Venue Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={formState.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Description */}
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="form-control"
                  value={formState.description}
                  onChange={handleChange}
                />
              </div>

              {/* Price & Capacity */}
              <div className="mb-3 d-flex gap-2">
                <div>
                  <label className="form-label">Price/night (USD)*</label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    value={formState.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Max guests*</label>
                  <input
                    type="number"
                    name="capacity"
                    className="form-control"
                    value={formState.maxGuests}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-3">
                <label className="form-label">Amenities</label>
                {['Wi-Fi', 'Parking', 'Breakfast', 'Pets'].map((amenity) => (
                  <div key={amenity} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={amenity}
                      checked={formState.amenities.includes(amenity)}
                      onChange={() => handleAmenityToggle(amenity)}
                    />
                    <label className="form-check-label" htmlFor={amenity}>
                      {amenity}
                    </label>
                  </div>
                ))}
              </div>

              {/* Rating */}
              <div className="mb-3">
                <label className="form-label">Rating</label>
                <input
                  type="number"
                  min={0}
                  max={5}
                  step={0.5}
                  name="rating"
                  className="form-control"
                  value={formState.rating}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, rating: Number(e.target.value) }))
                  }
                />
              </div>

              {/* Location */}
              <div className="mb-3">
                <label className="form-label">Location*</label>
                <input
                  type="text"
                  name="location.address"
                  placeholder="Address"
                  className="form-control mb-1"
                  value={formState.location.address}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="location.zip"
                  placeholder="Postcode"
                  className="form-control mb-1"
                  value={formState.location.zip}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="location.city"
                  placeholder="City"
                  className="form-control mb-1"
                  value={formState.location.city}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="location.country"
                  placeholder="Country"
                  className="form-control"
                  value={formState.location.country}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Media */}
              <div className="mb-3">
                <label className="form-label">Image URL</label>
                {formState.media.map((url, idx) => (
                  <input
                    key={idx}
                    type="text"
                    name={`media.${idx}`}
                    className="form-control mb-1"
                    value={url}
                    onChange={handleChange}
                    required={idx === 0}
                  />
                ))}
              </div>

              <hr />
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Creating...' : 'Confirm'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
