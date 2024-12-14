import React from 'react';
import { Movie } from '../types/movie';
import { TMDB_IMAGE_BASE_URL, BACKDROP_SIZE } from '../config/tmdb';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export function MovieModal({ movie, onClose }: MovieModalProps) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl"
          >
            ×
          </button>
          <img
            src={`${TMDB_IMAGE_BASE_URL}/${BACKDROP_SIZE}${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">{movie.title}</h2>
            <p className="text-gray-300 mb-4">{movie.overview}</p>
            <div className="flex items-center gap-4">
              <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                {movie.vote_average.toFixed(1)}
              </span>
              <span className="text-gray-400">
                {new Date(movie.release_date).getFullYear()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}