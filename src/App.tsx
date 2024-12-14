import React, { useEffect } from 'react';
import { MovieCard } from './components/MovieCard';
import { MovieSlider } from './components/MovieSlider';
import { SearchBar } from './components/SearchBar';
import { MovieModal } from './components/MovieModal';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { useMovies } from './hooks/useMovies';
import { Movie } from './types/movie';

function App() {
  const { 
    trendingMovies, 
    searchResults, 
    loading, 
    error, 
    fetchTrendingMovies, 
    searchMovies 
  } = useMovies();
  const [selectedMovie, setSelectedMovie] = React.useState<Movie | null>(null);

  useEffect(() => {
    fetchTrendingMovies();
  }, [fetchTrendingMovies]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-red-600">MovieApp</h1>
            <SearchBar onSearch={searchMovies} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {error && <ErrorMessage message={error} />}
        
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Hero Slider */}
            {trendingMovies.length > 0 && (
              <MovieSlider movies={trendingMovies} onMovieSelect={setSelectedMovie} />
            )}

            {/* Movie Grid */}
            <section className="container mx-auto px-4 py-16">
              <h2 className="text-2xl font-bold mb-8">
                {searchResults.length > 0 ? 'Search Results' : 'Trending Movies'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {(searchResults.length > 0 ? searchResults : trendingMovies).map((movie) => (
                  <MovieCard key={movie.id} movie={movie} onClick={setSelectedMovie} />
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      {/* Movie Modal */}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
}

export default App;