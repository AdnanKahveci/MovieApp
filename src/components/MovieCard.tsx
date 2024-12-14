import React from 'react';
import { Play, Star } from 'lucide-react';
import { Movie } from '../types/movie';
import { TMDB_IMAGE_BASE_URL, POSTER_SIZE } from '../config/tmdb';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export function MovieCard({ movie, onClick }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `${TMDB_IMAGE_BASE_URL}/${POSTER_SIZE}${movie.poster_path}`
    : 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=500';

  return (
    <div 
      className="group relative overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105"
      onClick={() => onClick(movie)}
    >
      <img
        src={posterUrl}
        alt={movie.title}
        className="w-full h-[400px] object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 p-4 text-white">
          <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1 bg-yellow-500 text-black px-2 py-1 rounded-md text-sm font-semibold">
              <Star size={14} />
              {movie.vote_average.toFixed(1)}
            </div>
            <span className="text-sm opacity-75">
              {new Date(movie.release_date).getFullYear()}
            </span>
          </div>
          <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-full">
            <Play size={16} />
            <span>Watch Trailer</span>
          </button>
        </div>
      </div>
    </div>
  );
}