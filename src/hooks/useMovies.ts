import { useState, useCallback } from 'react';
import { Movie } from '../types/movie';
import { movieAPI } from '../services/api';

export function useMovies() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrendingMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await movieAPI.getTrending();
      setTrendingMovies(data.results);
    } catch (err) {
      setError('Failed to fetch trending movies');
      console.error('Error fetching trending movies:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchMovies = useCallback(async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await movieAPI.searchMovies(query);
      setSearchResults(data.results);
    } catch (err) {
      setError('Failed to search movies');
      console.error('Error searching movies:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    trendingMovies,
    searchResults,
    loading,
    error,
    fetchTrendingMovies,
    searchMovies,
  };
}