import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Image from "next/image";
import { Movie } from "../types/Movie";

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        // TODO: Replace with actual API call
        const response = await fetch(`/api/movies/${id}`);
        if (!response.ok) {
          throw new Error("Movie not found");
        }
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleBookNow = () => {
    navigate(`/booking/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        {error || "Movie not found"}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <div className="relative w-full aspect-[2/3]">
            <Image
              src={movie.posterUrl}
              alt={movie.title}
              fill
              className="rounded-lg shadow-lg object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
          <div className="space-y-4">
            <p className="text-gray-600">{movie.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Duration</h3>
                <p>{movie.duration} minutes</p>
              </div>
              <div>
                <h3 className="font-semibold">Release Date</h3>
                <p>{new Date(movie.releaseDate).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="font-semibold">Genre</h3>
                <p>{movie.genre.join(", ")}</p>
              </div>
              <div>
                <h3 className="font-semibold">Language</h3>
                <p>{movie.language}</p>
              </div>
              <div>
                <h3 className="font-semibold">Director</h3>
                <p>{movie.director}</p>
              </div>
              <div>
                <h3 className="font-semibold">Rating</h3>
                <p>{movie.rating}/10</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold">Cast</h3>
              <p>{movie.cast.join(", ")}</p>
            </div>
            <div className="mt-6">
              <button
                onClick={handleBookNow}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Book Now - ${movie.price}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
