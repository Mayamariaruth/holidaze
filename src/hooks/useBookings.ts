import { useState } from 'react';
import { createBooking } from '../services/bookings.service';
import type { Venue } from '../types/venue.types';
import { isOverlapping } from '../utils/validation';
import { useAuthStore } from '../stores/auth.stores';

export function useBookings(venue: Venue | null, isAuthenticated: boolean) {
  const { role } = useAuthStore();
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [guests, setGuests] = useState<number | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const reset = () => {
    setDateFrom(null);
    setDateTo(null);
    setGuests('');
    setError(null);
    setSuccess(false);
  };

  const book = async () => {
    if (!venue) return;

    if (!isAuthenticated) {
      setError('You must be logged in to book');
      return;
    }

    if (role === 'venue_manager') {
      setError('Venue managers cannot make bookings');
      return;
    }

    if (!dateFrom || !dateTo) {
      setError('Please select dates');
      return;
    }

    if (!guests || guests < 1 || guests > venue.maxGuests) {
      setError('Invalid number of guests');
      return;
    }

    if (isOverlapping(dateFrom, dateTo, venue.bookings ?? [])) {
      setError('Selected dates are not available');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      await createBooking({
        venueId: venue.id,
        dateFrom: dateFrom.toISOString(),
        dateTo: dateTo.toISOString(),
        guests: guests as number,
      });
      setSuccess(true);
    } catch {
      setError('Failed to create booking');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    guests,
    setGuests,
    isSubmitting,
    error,
    success,
    book,
    reset,
  };
}
