import { useState } from 'react';
import type { Venue } from '../types/venue.types';
import { filterVenues } from '../utils/search';

interface SearchParams {
  location: string;
  dateFrom: Date | null;
  dateTo: Date | null;
  guests: number | null;
}

/**
 * Custom hook for searching and filtering venues.
 *
 * Manages search parameters and derives filtered results
 * based on the provided venue list.
 *
 * @param {Venue[]} initialVenues The full list of venues to search through.
 * @param {Partial<SearchParams>} [initialParams] Optional initial search parameters.
 * @returns {{
 *   searchParams: SearchParams,
 *   handleChange: (field: keyof SearchParams, value: string | number | Date | null) => void,
 *   searchResults: Venue[]
 * }} Search state and filtered results.
 */
export function useSearch(initialVenues: Venue[], initialParams?: Partial<SearchParams>) {
  // Search criteria state
  const [searchParams, setSearchParams] = useState<SearchParams>({
    location: '',
    dateFrom: null,
    dateTo: null,
    guests: null,
    ...initialParams,
  });

  /**
   * Update a single search parameter field.
   */
  const handleChange = (field: keyof SearchParams, value: string | number | Date | null) => {
    setSearchParams((prev) => ({ ...prev, [field]: value }));
  };

  // Derive filtered venues based on current search parameters
  const searchResults = filterVenues(initialVenues, searchParams);

  return { searchParams, handleChange, searchResults };
}
