import React from "react";
import { Link } from "react-router-dom";
import Image from "next/image";
import { Movie } from "../types/Movie";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
        <div className="relative w-full h-64">
          <Image
            src={movie.posterUrl}
            alt={movie.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{movie.duration} min</span>
            <span className="text-sm text-gray-600">{movie.language}</span>
          </div>
          <div className="mt-2">
            <span className="text-sm text-gray-600">
              Rating: {movie.rating}/10
            </span>
          </div>
          <div className="mt-2">
            <span className="text-sm font-medium text-blue-600">
              ${movie.price}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
