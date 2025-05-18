"use client";
import { useEffect, useState, useContext, useRef } from "react";
import { StoreContext } from "@/app/store/StoreProvider";
import { Movie } from "@/app/types/movie";
import { getMovieDetail, getMovieList } from "@/app/services/movie";
import { chakra_petch } from "@/app/ui/fontui";
import { Rate, Carousel } from "antd";
import MovieCard from "@/app/ui/components/card/movieCard";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const refUpComing = useRef<any>(null);
  const refOnScreen = useRef<any>(null);

  const store = useContext<any>(StoreContext);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [listMovie, setListMovie] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const { slug } = await params;
        const response = await getMovieDetail(slug);
        // console.log("Raw API Response:", response);

        if (response.isSuccess && response.data) {
          store.movie.setData(response);
          console.log("Response: ", response);
          console.log("Response Data: ", response.data);
          console.log("Movie Data: ", response.data.movie);

          setMovie(response.data.movie);
        } else {
          setError("Không thể lấy thông tin phim");
        }
      } catch (error) {
        console.error("Error fetching movie: ", error);
        setError("Có lỗi xảy ra khi tải thông tin phim");
      } finally {
        setLoading(false);
      }
    };

    const fetchListMovie = async () => {
      try {
        const response = await getMovieList();

        if (response.isSuccess && response.data) {
          store.movie.setData(response);
          setListMovie(response.data);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setListMovie([]);
      }
    };

    fetchMovie();
    fetchListMovie();
  }, [params]);

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!movie) {
    return <div>Không tìm thấy thông tin phim</div>;
  }

  console.log(listMovie);

  return (
    <div className="mx-auto relative py-6">
      <div className="w-[95%] h-[85vh] mx-auto">
        <iframe
          width="100%"
          height="100%"
          src={movie.trailerUrl}
          title={movie.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
      <div
        className={`grid grid-cols-4 ml-10 mt-8 gap-6 ${chakra_petch.className}`}
      >
        <div className="flex col-span-3 gap-8 pr-6 rounded shadow-2xl">
          <img src={movie.posterUrl} alt={movie.title} className="w-64" />
          <div>
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            <div className="flex flex-col gap-3">
              <div className="text-xl">
                <b>Thể loại:</b> {movie.genre.join(", ")}
              </div>
              <div className="text-xl">
                <b>Ngày chiếu:</b>{" "}
                {new Date(movie.releaseDate).toLocaleDateString("vi-VN")}
              </div>
              <div className="text-xl">
                <b>Thời lượng: </b> {movie.duration} phút
              </div>
              <div className="text-xl">
                <b>Đánh giá: </b>
                <Rate disabled defaultValue={movie.rating} count={10} />
              </div>
              <div className="text-xl">
                <b>Mô tả: </b>
                {movie.description}
              </div>
              <div className="text-xl">
                <b>Đạo diễn: </b>
                {movie.director}
              </div>
              <div className="text-xl">
                <b>Diễn viên: </b>
                {movie.cast.join(", ")}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 w-[90%] shadow-2xl flex items-center justify-center">
          <Link
            href={`/buy-ticket/${movie._id}`}
            className="m-auto w-fit bg-indigo-600 text-white text-2xl px-10 py-3 rounded-xl"
          >
            Đặt vé ngay
          </Link>
        </div>
      </div>
      <div className="w-[95%] mx-auto mt-10">
        <h1 className="text-4xl font-semibold text-indigo-600">
          Các bộ phim khác
        </h1>
        <div className="w-full border-black relative mt-8">
          <Carousel
            autoplay
            dots={false}
            slidesToShow={5}
            slidesToScroll={1}
            className="h-full w-full"
            ref={refOnScreen}
          >
            {listMovie.map((movie) => (
              <MovieCard movie={movie} key={movie._id} />
            ))}
          </Carousel>

          <button
            onClick={() => refUpComing.current?.prev()}
            className={
              listMovie.length == 5
                ? "hidden"
                : "w-10 h-10 absolute top-1/2 -left-0.5 z-50 hover:cursor-pointer"
            }
          >
            <LeftOutlined className="text-white! relative text-2xl bg-black opacity-65 w-10 h-10 flex items-center justify-center rounded-4xl" />
          </button>
          <button
            onClick={() => refUpComing.current?.next()}
            className={
              listMovie.length == 5
                ? "hidden"
                : "w-10 h-10 absolute top-1/2 -right-0.5 z-50 hover:cursor-pointer"
            }
          >
            <RightOutlined className="text-white! text-2xl bg-black opacity-65 w-10 h-10 flex items-center justify-center rounded-4xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
