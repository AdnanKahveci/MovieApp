import React from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Movie } from '../types/movie';
import { TMDB_IMAGE_BASE_URL, BACKDROP_SIZE } from '../config/tmdb';

interface MovieSliderProps {
  movies: Movie[];
  onMovieSelect: (movie: Movie) => void;
}

export function MovieSlider({ movies, onMovieSelect }: MovieSliderProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % movies.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  const currentMovie = movies[currentIndex];
  const backdropUrl = `${TMDB_IMAGE_BASE_URL}/${BACKDROP_SIZE}${currentMovie?.backdrop_path}`;

  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-bold mb-4">{currentMovie?.title}</h1>
              <p className="text-lg mb-8 opacity-90">{currentMovie?.overview}</p>
              <button 
                onClick={() => onMovieSelect(currentMovie)}
                className="bg-red-600 hover:bg-red-700 transition-colors px-8 py-3 rounded-full font-semibold flex items-center gap-2"
              >
                <Play size={20} />
                Watch Now
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}