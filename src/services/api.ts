import { Movie, MovieResponse } from '../types/movie';
import { TMDB_BASE_URL } from '../config/tmdb';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export async function fetchFromTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const queryParams = new URLSearchParams({
    api_key: API_KEY,
    ...params,
  });

  const response = await fetch(`${TMDB_BASE_URL}${endpoint}?${queryParams}`);
  
  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const movieAPI = {
  getTrending: () => 
    fetchFromTMDB<MovieResponse>('/trending/movie/day'),
  
  searchMovies: (query: string) => 
    fetchFromTMDB<MovieResponse>('/search/movie', { query }),
    
  getMovieDetails: (id: number) => 
    fetchFromTMDB<Movie>(`/movie/${id}`),
};