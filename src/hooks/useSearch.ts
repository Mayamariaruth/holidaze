import { useState } from 'react';
import type { Venue } from '../types/venue.types';
import { filterVenues } from '../utils/search';

interface SearchParams {
  location: string;
  dateFrom: Date | null;
  dateTo: Date | null;
  guests: number | null;
}

export function useSearch(initialVenues: Venue[], initialParams?: Partial<SearchParams>) {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    location: '',
    dateFrom: null,
    dateTo: null,
    guests: null,
    ...initialParams,
  });

  const handleChange = (field: keyof SearchParams, value: string | number | Date | null) => {
    setSearchParams((prev) => ({ ...prev, [field]: value }));
  };

  const searchResults = filterVenues(initialVenues, searchParams);

  return { searchParams, handleChange, searchResults };
}
