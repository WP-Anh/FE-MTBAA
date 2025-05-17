"use client";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState, useContext } from "react";
import { getMovieList } from "@/app/services/movie";
import { Movie } from "@/app/types/movie";
import { StoreContext } from "@/app/store/StoreProvider";
import MovieCard from "../components/card/movieCard";
import Link from "next/link";

export default function List() {
  const store = useContext<any>(StoreContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getMovieList();

        if (response.isSuccess && response.data) {
          store.movie.setData(response);
          setFilteredMovies(response.data);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setFilteredMovies([]);
      }
    };
    fetchMovies();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (store.movie.data?.data && Array.isArray(store.movie.data.data)) {
      const filtered = store.movie.data.data.filter((m: Movie) =>
        m.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  };

  return (
    <div className="font-semibold text-2xl py-4 px-3.5 w-full shadow-2xl bg-gray-100 rounded">
      <span className="text-indigo-600 text-4xl">Danh sách phim</span>
      <div className="flex gap-3 items-center mt-5 h-fit">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Tìm kiếm phim..."
          className="border-indigo-700 border-2 rounded outline-none px-1.5 text-lg py-0.5 w-[54%]"
        />
        <button className="w-11 text-indigo-600">
          <MagnifyingGlassCircleIcon />
        </button>
      </div>
      <div className="mt-6 grid grid-cols-4 items-center justify-between gap-y-6">
        {Array.isArray(filteredMovies) && filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <Link href={`/movies/${String(movie._id)}`} key={movie._id}>
              <MovieCard
                movie={{
                  _id: movie._id,
                  movie: movie,
                  title: movie.title,
                  posterUrl: movie.posterUrl,
                  description: movie.description,
                  rating: movie.rating,
                  duration: movie.duration,
                  genre: movie.genre,
                  releaseDate: movie.releaseDate,
                  director: movie.director,
                  cast: movie.cast,
                  img: movie.img,
                  trailerUrl: movie.trailerUrl,
                  price: movie.price,
                }}
              />
            </Link>
          ))
        ) : (
          <div className="col-span-4 text-center py-10">
            <p className="text-gray-600">Không tìm thấy phim nào</p>
          </div>
        )}
      </div>
    </div>
  );
}
