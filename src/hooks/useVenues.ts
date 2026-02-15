import { useEffect, useState } from 'react';
import type { Venue } from '../types/venue.types';
import { getVenues } from '../services/venues.service';

/**
 * Custom hook for fetching and managing venue data.
 *
 * Exposes a `refetch` method for explicit cache invalidation
 * after create/update/delete actions.
 */
export function useVenues() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  /**
   * Fetch all venues from the API.
   */
  const fetchVenues = async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      const data = await getVenues();
      setVenues(data);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  return { venues, isLoading, isError };
}
