"use client";
import MovieCarousel from "./ui/components/carousel/MovieCarousel";
import { movies, upcomingMovies } from "./data/movies";
import MovieCard from "./ui/components/card/movieCard";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";

export default function Home() {
  const refUpComing = useRef<any>(null);
  const refOnScreen = useRef<any>(null);

  const [chooseType, setChooseType] = useState("on-screen");

  return (
    <div className="w-full">
      <main>
        {/* Movie Carousel */}
        <MovieCarousel />

        {/* Main Content */}
        <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Chào mừng */}
          <div className="text-center relative">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Chào mừng đến với MTBA-VN
            </h1>
            <p className="text-xl text-gray-600">
              Khám phá thế giới điện ảnh với những bộ phim hay nhất
            </p>
          </div>

          {/* Phim sắp/đang chiếu */}
          <div className="container mx-auto px-4 py-8 relative">
            <div className="flex gap-6 ml-3.5 mb-4 transition tran">
              {/* Sắp chiếu */}
              <button
                onClick={() => setChooseType("on-screen")}
                className="relative z-50 group overflow-hidden" // Thêm group và overflow-hidden
              >
                <h2
                  className={`text-2xl font-bold mb-4 transition-all duration-300 ${
                    chooseType !== "on-screen"
                      ? "text-gray-300 hover:text-gray-400"
                      : "text-primary"
                  }`}
                >
                  Phim đang chiếu
                  {/* Hiệu ứng gạch chân animation */}
                  <span
                    className={`absolute bottom-3 left-0 h-0.5 bg-primary transition-all duration-500 ${
                      chooseType === "on-screen"
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </h2>
              </button>
              {/* Đang chiếu */}
              <button
                onClick={() => setChooseType("up-coming")}
                className="relative z-50 group overflow-hidden" // Thêm group và overflow-hidden
              >
                <h2
                  className={`text-2xl font-bold mb-4 transition-all duration-300 ${
                    chooseType !== "up-coming"
                      ? "text-gray-300 hover:text-gray-400"
                      : "text-primary"
                  }`}
                >
                  Phim sắp chiếu
                  {/* Hiệu ứng gạch chân animation */}
                  <span
                    className={`absolute bottom-3 left-0 h-0.5 bg-primary transition-all duration-500 ${
                      chooseType === "up-coming"
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </h2>
              </button>
            </div>
            {/* Hiện phim đang chiếu */}
            <div
              className={`w-full border-black relative group ${
                chooseType == "on-screen" ? "" : "hidden"
              }`}
            >
              <Carousel
                autoplay
                dots={false}
                slidesToShow={4}
                slidesToScroll={1}
                className="h-full w-full"
                ref={refOnScreen}
              >
                {movies.map((movie) => (
                  <MovieCard movie={movie} key={movie.id} />
                ))}
              </Carousel>
              {/* Nút tương tác */}
              <button
                onClick={() => refOnScreen.current?.prev()}
                className="w-10 h-10 absolute top-1/2 -left-0.5 z-50 hover:cursor-pointer"
              >
                <LeftOutlined className="text-white! relative text-2xl bg-black opacity-65 w-10 h-10 flex items-center justify-center rounded-4xl" />
              </button>
              <button
                onClick={() => refOnScreen.current?.next()}
                className="w-10 h-10 absolute top-1/2 -right-0.5 z-50 hover:cursor-pointer"
              >
                <RightOutlined className="text-white! text-2xl bg-black opacity-65 w-10 h-10 flex items-center justify-center rounded-4xl" />
              </button>
            </div>

            {/* Hiện phim sắp chiếu */}
            <div
              className={`w-full border-black relative group ${
                chooseType == "up-coming" ? "" : "hidden"
              }`}
            >
              <Carousel
                autoplay
                dots={false}
                slidesToShow={4}
                slidesToScroll={1}
                className="h-full w-full"
                ref={refUpComing}
              >
                {upcomingMovies.map((movie) => (
                  <MovieCard movie={movie} key={movie.id} />
                ))}
              </Carousel>
              {/* Nút tương tác */}
              <button
                onClick={() => refUpComing.current?.prev()}
                className="w-10 h-10 absolute top-1/2 -left-0.5 z-50 hover:cursor-pointer"
              >
                <LeftOutlined className="text-white! relative text-2xl bg-black opacity-65 w-10 h-10 flex items-center justify-center rounded-4xl" />
              </button>
              <button
                onClick={() => refUpComing.current?.next()}
                className="w-10 h-10 absolute top-1/2 -right-0.5 z-50 hover:cursor-pointer"
              >
                <RightOutlined className="text-white! text-2xl bg-black opacity-65 w-10 h-10 flex items-center justify-center rounded-4xl" />
              </button>
            </div>
          </div>
        </main>
      </main>
    </div>
  );
}
