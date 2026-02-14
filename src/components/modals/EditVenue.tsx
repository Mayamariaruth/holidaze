import { useState, useEffect } from 'react';
import type { Venue, Location, VenuePayload } from '../../types/venue.types';
import { useAuthStore } from '../../stores/auth.stores';
import { updateVenue } from '../../services/venues.service';

interface Props {
  venue: Venue;
  onClose: () => void;
  onEdit: (venue: Venue) => void;
}

export default function EditVenue({ venue, onClose, onEdit }: Props) {
  const { user } = useAuthStore();

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

  // Prepopulate form
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onClose}></div>
      <div className="modal show d-block" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content p-3">
            <div className="modal-header">
              <h2 className="modal-title">Edit venue</h2>
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
                    name="name"
                    className="form-control"
                    value={formState.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label htmlFor="description" className="form-label mb-0">
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
                  <div className="flex-fill">
                    <label className="form-label mb-0">Price/night (USD)*</label>
                    <input
                      type="number"
                      name="price"
                      className="form-control"
                      value={formState.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex-fill">
                    <label className="form-label mb-0">Max guests*</label>
                    <input
                      type="number"
                      name="maxGuests"
                      className="form-control"
                      value={formState.maxGuests}
                      onChange={handleChange}
                      required
                    />
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
                      className="form-control mb-1"
                      value={formState.location.address}
                      onChange={handleChange}
                      required
                    />
                    <div className="d-flex gap-2">
                      <div className="flex-fill">
                        <label className="mb-0">Postcode</label>
                        <input
                          type="text"
                          name="location.zip"
                          className="form-control mb-1"
                          value={formState.location.zip}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="flex-fill">
                        <label className="mb-0">City</label>
                        <input
                          type="text"
                          name="location.city"
                          className="form-control mb-1"
                          value={formState.location.city}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <label className="mb-0">Country</label>
                    <input
                      type="text"
                      name="location.country"
                      className="form-control"
                      value={formState.location.country}
                      onChange={handleChange}
                      required
                    />
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
                      className="form-control mb-1"
                      value={url}
                      onChange={handleChange}
                      required={idx === 0}
                    />
                  ))}
                </div>
                <hr className="my-4" />
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
