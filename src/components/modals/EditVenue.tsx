import { useState, useEffect } from 'react';
import type { Venue, Location, VenuePayload } from '../../types/venue.types';
import { useAuthStore } from '../../stores/auth.stores';
import { updateVenue } from '../../services/venues.service';
import Loader from '../ui/Loader';

interface Props {
  venue: Venue;
  onClose: () => void;
  onEdit: (venue: Venue) => void;
}

/**
 * Modal for editing an existing venue.
 *
 * Prepopulates form with venue data, allows updating name, description, price,
 * max guests, amenities, rating, location, and images.
 *
 * @param {Object} props
 * @param {Venue} props.venue The venue to edit
 * @param {() => void} props.onClose Callback to close the modal
 * @param {(venue: Venue) => void} props.onEdit Callback invoked with the updated venue
 * @returns {JSX.Element} Modal component for editing a venue
 */
export default function EditVenue({ venue, onClose, onEdit }: Props) {
  const { user } = useAuthStore();

  // Form state
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

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Prepopulate form with venue data
  useEffect(() => {
    if (!venue) return;

    const amenities: string[] = [];
    if (venue.meta?.wifi) amenities.push('Wi-Fi');
    if (venue.meta?.parking) amenities.push('Parking');
    if (venue.meta?.breakfast) amenities.push('Breakfast');
    if (venue.meta?.pets) amenities.push('Pets');

    setFormState({
      name: venue.name ?? '',
      description: venue.description ?? '',
      price: venue.price !== undefined ? venue.price.toString() : '',
      maxGuests: venue.maxGuests !== undefined ? venue.maxGuests.toString() : '',
      rating: venue.rating ?? '',
      amenities,
      location: {
        address: venue.location?.address ?? '',
        city: venue.location?.city ?? '',
        zip: venue.location?.zip ?? '',
        country: venue.location?.country ?? '',
        continent: venue.location?.continent ?? '',
        lat: venue.location?.lat ?? 0,
        long: venue.location?.long ?? 0,
      },
      media: venue.media?.map((m) => m.url ?? '') || [''],
    });
  }, [venue]);

  // Handles input and textarea changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name.startsWith('location.')) {
      const key = name.split('.')[1];
      setFormState((prev) => ({ ...prev, location: { ...prev.location, [key]: value } }));
    } else if (name.startsWith('media.')) {
      const idx = parseInt(name.split('.')[1]);
      const newMedia = [...formState.media];
      newMedia[idx] = value;
      setFormState((prev) => ({ ...prev, media: newMedia }));
    } else {
      setFormState((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Toggles amenities checkboxes
  const handleAmenityToggle = (amenity: string) => {
    setFormState((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  // Validates form fields and sets errors
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) newErrors.name = 'Venue name is required';
    if (!formState.price || Number(formState.price) <= 0) newErrors.price = 'Price is required';
    if (!formState.maxGuests || Number(formState.maxGuests) <= 0)
      newErrors.maxGuests = 'Max guests is required';
    if (!formState.location.address.trim()) newErrors['location.address'] = 'Address is required';
    if (!formState.location.city.trim()) newErrors['location.city'] = 'City is required';
    if (!formState.location.zip.trim()) newErrors['location.zip'] = 'Postcode is required';
    if (!formState.location.country.trim()) newErrors['location.country'] = 'Country is required';
    if (!formState.media[0]?.trim()) newErrors['media.0'] = 'Image URL is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submits the updated venue
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (!user) throw new Error('User not logged in');

      const payload: VenuePayload = {
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

      const updated = await updateVenue(venue.id, payload);
      onEdit(updated);
      onClose();
    } catch (err) {
      console.error('Failed to update venue', err);
    } finally {
      setLoading(false);
    }
  };

  // Clears errors and closes modal
  const handleClose = () => {
    setErrors({});
    onClose();
  };

  return (
    <>
      <div className="modal-backdrop fade show" onClick={handleClose}></div>
      <div className="modal show d-block" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-3">
            {/* Loader overlay */}
            {loading && <Loader overlay size="lg" />}
            <div className="modal-header">
              <h2 className="modal-title">Edit venue</h2>
              <button type="button" className="btn-close" onClick={handleClose}></button>
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
                    name="name"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    value={formState.name}
                    onChange={handleChange}
                    required
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label htmlFor="description" className="form-label mb-0">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                    value={formState.description}
                    onChange={handleChange}
                  />
                  {errors.description && (
                    <div className="invalid-feedback">{errors.description}</div>
                  )}
                </div>

                {/* Price & Capacity */}
                <div className="mb-3 d-flex gap-2">
                  <div className="flex-fill">
                    <label className="form-label mb-0">Price/night (USD)*</label>
                    <input
                      type="number"
                      name="price"
                      className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                      value={formState.price}
                      onChange={handleChange}
                      required
                    />
                    {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                  </div>
                  <div className="flex-fill">
                    <label className="form-label mb-0">Max guests*</label>
                    <input
                      type="number"
                      name="maxGuests"
                      className={`form-control ${errors.maxGuests ? 'is-invalid' : ''}`}
                      value={formState.maxGuests}
                      onChange={handleChange}
                      required
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
                    className="form-control"
                    value={formState.rating}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        rating: e.target.value === '' ? '' : Number(e.target.value),
                      }))
                    }
                  />
                </div>

                {/* Location */}
                <div className="mb-3">
                  <label className="form-label mb-0">Location*</label>
                  <div>
                    <label className="mb-0">Address</label>
                    <input
                      type="text"
                      name="location.address"
                      className={`form-control ${errors['location.address'] ? 'is-invalid' : ''}`}
                      value={formState.location.address}
                      onChange={handleChange}
                      required
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
                          className={`form-control ${errors['location.zip'] ? 'is-invalid' : ''}`}
                          value={formState.location.zip}
                          onChange={handleChange}
                          required
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
                          className={`form-control ${errors['location.city'] ? 'is-invalid' : ''}`}
                          value={formState.location.city}
                          onChange={handleChange}
                          required
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
                      className={`form-control ${errors['location.country'] ? 'is-invalid' : ''}`}
                      value={formState.location.country}
                      onChange={handleChange}
                      required
                    />
                    {errors['location.country'] && (
                      <div className="invalid-feedback">{errors['location.country']}</div>
                    )}
                  </div>
                </div>

                {/* Media */}
                <div className="mb-3">
                  <label className="form-label mb-0">Image URL</label>
                  {formState.media.map((url, idx) => (
                    <input
                      key={idx}
                      type="text"
                      name={`media.${idx}`}
                      className={`form-control ${errors['media.0'] ? 'is-invalid' : ''}`}
                      value={url}
                      onChange={handleChange}
                      required={idx === 0}
                    />
                  ))}
                  {errors['media.0'] && <div className="invalid-feedback">{errors['media.0']}</div>}
                </div>

                <hr className="my-4" />
                {/* Buttons */}
                <div className="d-flex gap-2">
                  <button type="button" className="btn btn-cancel flex-fill" onClick={onClose}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary flex-fill" disabled={loading}>
                    {loading ? 'Updating...' : 'Confirm'}
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
