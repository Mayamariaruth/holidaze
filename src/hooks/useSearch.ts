import { useState } from 'react';
import type { Venue } from '../types/venue.types';
import { filterVenues } from '../utils/search';

export function useSearch(initialVenues: Venue[]) {
  const [searchParams, setSearchParams] = useState({
    location: '',
    dateFrom: null,
    dateTo: null,
    guests: null,
  });

  const handleChange = (field: string, value: string | number | Date | null) => {
    setSearchParams((prev) => ({ ...prev, [field]: value }));
  };

  const searchResults = filterVenues(initialVenues, searchParams);

  return {
    searchParams,
    handleChange,
    searchResults,
  };
}
