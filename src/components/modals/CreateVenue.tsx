import { useState } from 'react';
import type { Venue, Location, VenuePayload } from '../../types/venue.types';
import { useAuthStore } from '../../stores/auth.stores';
import { createVenue } from '../../services/venues.service';
import Loader from '../ui/Loader';

interface Props {
  onClose: () => void;
  onCreate: (venue: Venue) => void;
}

export default function CreateVenue({ onClose, onCreate }: Props) {
  const { user } = useAuthStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    description: '',
    price: '',
    maxGuests: '',
    amenities: [] as string[],
    rating: '' as number | '',
    location: { address: '', city: '', zip: '', country: '' } as Location,
    media: [''] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name.startsWith('location.')) {
      const key = name.split('.')[1];
      setFormState((prev) => ({
        ...prev,
        location: { ...prev.location, [key]: value },
      }));
    } else if (name.startsWith('media.')) {
      const idx = parseInt(name.split('.')[1]);
      const newMedia = [...formState.media];
      newMedia[idx] = value;
      setFormState((prev) => ({ ...prev, media: newMedia }));
    } else {
      setFormState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormState((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formState.name.trim()) newErrors.name = 'Venue name is required';
    if (!formState.description.trim()) newErrors.description = 'Description is required';
    if (!formState.price || Number(formState.price) <= 0) newErrors.price = 'Price is required';
    if (!formState.maxGuests || Number(formState.maxGuests) <= 0)
      newErrors.maxGuests = 'Max guests is required';

    const loc = formState.location;
    if (!loc.address.trim()) newErrors['location.address'] = 'Address is required';
    if (!loc.city.trim()) newErrors['location.city'] = 'City is required';
    if (!loc.zip.trim()) newErrors['location.zip'] = 'Postcode is required';
    if (!loc.country.trim()) newErrors['location.country'] = 'Country is required';

    if (!formState.media[0]?.trim()) newErrors['media.0'] = 'Image URL is required';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      if (!user) throw new Error('User not logged in');

      const newVenue: VenuePayload = {
        name: formState.name,
        description: formState.description,
        price: Number(formState.price),
        rating: formState.rating === '' ? undefined : formState.rating,
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
    <>
      <div className="modal-backdrop fade show" onClick={onClose}></div>
      <div className="modal show d-block" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-3">
            {/* Loader overlay */}
            {loading && <Loader overlay size="lg" />}
            <div className="modal-header">
              <h2 className="modal-title">Create new venue</h2>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label mb-0">
                    Venue Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Venue Name"
                    name="name"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    value={formState.name}
                    onChange={handleChange}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label htmlFor="description" className="form-label mb-0">
                    Description*
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Description"
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                    value={formState.description}
                    onChange={handleChange}
                  />
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>

                {/* Price & guest */}
                <div className="mb-3 d-flex gap-2">
                  <div className="flex-fill">
                    <label className="form-label mb-0">Price/night (USD)*</label>
                    <input
                      type="number"
                      name="price"
                      placeholder="Price/night"
                      className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                      value={formState.price}
                      onChange={handleChange}
                    />
                    {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                  </div>
                  <div className="flex-fill">
                    <label className="form-label mb-0">Max guests*</label>
                    <input
                      type="number"
                      name="maxGuests"
                      placeholder="Max guests"
                      className={`form-control ${errors.maxGuests ? 'is-invalid' : ''}`}
                      value={formState.maxGuests}
                      onChange={handleChange}
                    />
                    {errors.maxGuests && <div className="invalid-feedback">{errors.maxGuests}</div>}
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-3">
                  <label className="form-label mb-0">Amenities</label>
                  {['Wi-Fi', 'Parking', 'Breakfast', 'Pets'].map((amenity) => (
                    <div key={amenity} className="form-check d-flex align-items-center gap-2">
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
                  <label className="form-label mb-0">Rating</label>
                  <input
                    type="number"
                    min={0}
                    max={5}
                    step={0.5}
                    name="rating"
                    placeholder="0–5"
                    className="form-control"
                    value={formState.rating}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        rating: e.target.value === '' ? '' : Number(e.target.value),
                      }))
                    }
                  />
                  {errors.rating && <div className="invalid-feedback">{errors.rating}</div>}
                </div>

                {/* Location */}
                <div className="mb-3">
                  <label className="form-label mb-0">Location*</label>
                  <div>
                    <label className="mb-0">Address</label>
                    <input
                      type="text"
                      name="location.address"
                      placeholder="Address"
                      className={`form-control ${errors['location.address'] ? 'is-invalid' : ''}`}
                      value={formState.location.address}
                      onChange={handleChange}
                    />
                    {errors['location.address'] && (
                      <div className="invalid-feedback">{errors['location.address']}</div>
                    )}
                    <div className="d-flex gap-2">
                      <div className="flex-fill">
                        <label className="mb-0">Postcode</label>
                        <input
                          type="text"
                          name="location.zip"
                          placeholder="Postcode"
                          className={`form-control ${errors['location.zip'] ? 'is-invalid' : ''}`}
                          value={formState.location.zip}
                          onChange={handleChange}
                        />
                        {errors['location.zip'] && (
                          <div className="invalid-feedback">{errors['location.zip']}</div>
                        )}
                      </div>
                      <div className="flex-fill">
                        <label className="mb-0">City</label>
                        <input
                          type="text"
                          name="location.city"
                          placeholder="City"
                          className={`form-control ${errors['location.city'] ? 'is-invalid' : ''}`}
                          value={formState.location.city}
                          onChange={handleChange}
                        />
                        {errors['location.city'] && (
                          <div className="invalid-feedback">{errors['location.city']}</div>
                        )}
                      </div>
                    </div>
                    <label className="mb-0">Country</label>
                    <input
                      type="text"
                      name="location.country"
                      placeholder="Country"
                      className={`form-control ${errors['location.country'] ? 'is-invalid' : ''}`}
                      value={formState.location.country}
                      onChange={handleChange}
                    />
                    {errors['location.country'] && (
                      <div className="invalid-feedback">{errors['location.country']}</div>
                    )}
                  </div>
                </div>

                {/* Media */}
                <div className="mb-3">
                  <label className="form-label mb-0">Image URL*</label>
                  {formState.media.map((url, idx) => (
                    <input
                      key={idx}
                      type="text"
                      placeholder="e.g. https://unsplash.com/photos/a-large-swimming-pool"
                      name={`media.${idx}`}
                      className={`form-control ${errors['media.0'] ? 'is-invalid' : ''}`}
                      value={url}
                      onChange={handleChange}
                    />
                  ))}
                  {errors['media.0'] && <div className="invalid-feedback">{errors['media.0']}</div>}
                </div>

                <hr className="my-4" />
                <div className="d-flex gap-2">
                  <button type="button" className="btn btn-cancel flex-fill" onClick={onClose}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary flex-fill" disabled={loading}>
                    {loading ? 'Creating...' : 'Confirm'}
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
