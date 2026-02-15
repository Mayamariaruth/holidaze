import { useState } from 'react';
import { createBooking } from '../services/bookings.service';
import type { Venue } from '../types/venue.types';
import { isOverlapping } from '../utils/validation';
import { useAuthStore } from '../stores/auth.stores';

/**
 * Custom hook for managing venue bookings.
 *
 * Handles booking form state, validation, and submission logic,
 * including authentication and role-based restrictions.
 *
 * @param {Venue | null} venue The venue being booked.
 * @param {boolean} isAuthenticated Whether the user is authenticated.
 * @returns {{
 *   dateFrom: Date | null,
 *   setDateFrom: (date: Date | null) => void,
 *   dateTo: Date | null,
 *   setDateTo: (date: Date | null) => void,
 *   guests: number | '',
 *   setGuests: (guests: number | '') => void,
 *   isSubmitting: boolean,
 *   error: string | null,
 *   success: boolean,
 *   book: () => Promise<void>,
 *   reset: () => void
 * }} Booking state and helpers.
 */
export function useBookings(venue: Venue | null, isAuthenticated: boolean) {
  const { role } = useAuthStore();

  // Booking form state
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [guests, setGuests] = useState<number | ''>('');

  // Submission and feedback state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  /**
   * Reset booking form and feedback state.
   */
  const reset = () => {
    setDateFrom(null);
    setDateTo(null);
    setGuests('');
    setError(null);
    setSuccess(false);
  };

  /**
   * Create a booking for the selected venue.
   *
   * Performs validation checks before submitting the booking request.
   */
  const book = async () => {
    if (!venue) return;

    if (!isAuthenticated) {
      setError('You must be logged in to book');
      return;
    }

    // Prevent venue managers from booking venues
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

    // Validate date availability against existing bookings
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
