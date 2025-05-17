"use client";
import { geistMono, prompt } from "../../fontui";
import { useState } from "react";
import { Movie } from "@/app/types/movie";

interface Props {
  movie: Movie;
}

export default function MovieCard({ movie }: Props) {
  const [hidden, setHidden] = useState(true);
  const handleClick = () => {
    setHidden(!hidden);
  };

  return (
    <div className="mx-4">
      <div
        key={movie._id}
        className="bg-white rounded-lg shadow-lg overflow-hidden h-[25.5rem] relative cursor-pointer group"
        onMouseEnter={handleClick}
        onMouseLeave={handleClick}
      >
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Overlay with transition */}
        <div
          className={`bg-black bg-opacity-75 z-20 absolute h-full top-0 w-full transition-opacity duration-300 ${
            hidden ? "opacity-0" : "opacity-75"
          }`}
        ></div>

        {/* Movie info with transition */}
        <div
          className={`bottom-0 absolute z-30 px-2.5 h-fit py-1.5 transition-all duration-300 transform ${
            hidden ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          <h3 className="text-white text-3xl font-semibold mb-3">
            {movie.title}
          </h3>
          <p className={`text-white text-base mb-2 ${prompt.className}`}>
            {movie.description}
          </p>
          <div className={`block mb-0 mt-auto text-lg ${geistMono.className}`}>
            <span className="text-white">
              {new Date(movie.releaseDate).toLocaleDateString("vi-VN")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
