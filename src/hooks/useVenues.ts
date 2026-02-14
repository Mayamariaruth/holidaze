import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { Venue } from '../types/venue.types';
import { getVenues } from '../services/venues.service';

export function useVenues() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const location = useLocation();

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
  }, [location.pathname]);

  return { venues, isLoading, isError };
}
