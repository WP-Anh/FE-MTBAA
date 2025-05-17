"use client";

import { Carousel, Rate } from "antd";
import Image from "next/image";
import Link from "next/link";
import { chakra_petch, prompt } from "../../fontui";
import { introUpComingMovie } from "@/app/data/movies";

// Mock data - sau này sẽ được thay thế bằng API call

export default function MovieCarousel() {
  return (
    <div className="w-full bg-gray-900">
      <div className="w-full h-[90vh]">
        <Carousel
          autoplay
          dots={true}
          slidesToShow={1}
          slidesToScroll={1}
          effect="fade"
          className="h-full"
        >
          {introUpComingMovie.map((movie) => (
            <div key={movie.id} className="relative h-[90vh]">
              {/* Background Image */}
              <Image
                src={movie.poster}
                alt={movie.title}
                fill
                className="object-cover"
                priority
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex items-end">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                  <div className="max-w-2xl">
                    <h2
                      className={`${chakra_petch.className} text-5xl font-semibold md:text-6xl font-bold text-white mb-4`}
                    >
                      {movie.title}
                    </h2>
                    <div className="flex items-center mb-4">
                      <Rate
                        disabled
                        defaultValue={movie.rating}
                        allowHalf
                        className="text-yellow-400"
                      />
                      <span className="ml-2 text-white">{movie.rating}/5</span>
                    </div>
                    <p
                      className={`${prompt.className} text-gray-200 text-lg md:text-xl mb-8 line-clamp-3`}
                    >
                      {movie.description}
                    </p>
                    <div className="flex gap-4">
                      <Link
                        href={`/movies/${movie.id}`}
                        className="bg-red-600! hover:bg-red-700! text-white! px-8 py-3 rounded-full text-xl font-semibold transition-colors "
                      >
                        Đặt vé ngay
                      </Link>
                      <Link
                        href={`/movies/${movie.id}/booking`}
                        className="bg-white! hover:bg-gray-100! text-blue-500 px-8 py-3 rounded-full text-lg font-semibold transition-colors"
                      >
                        Xem review
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
