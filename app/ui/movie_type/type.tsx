"use client";
import { chakra_petch } from "../fontui";
import { useState, useEffect } from "react";
import { StoreContext } from "@/app/store/StoreProvider";
import { useContext } from "react";
import { Movie } from "@/app/types/movie";

interface Genre {
  id: string;
  name: string;
  checked: boolean;
}

const genres: Genre[] = [
  { id: "action", name: "Hành động", checked: false },
  { id: "adventure", name: "Phiêu lưu", checked: false },
  { id: "comedy", name: "Hài", checked: false },
  { id: "romance", name: "Tình cảm", checked: false },
  { id: "horror", name: "Kinh dị", checked: false },
  { id: "psychological", name: "Tâm lý", checked: false },
  { id: "scifi", name: "Sci-fi", checked: false },
  { id: "fantasy", name: "Giả tưởng", checked: false },
  { id: "animation", name: "Hoạt hình", checked: false },
  { id: "war", name: "Chiến tranh", checked: false },
  { id: "crime", name: "Tội phạm", checked: false },
  { id: "mystery", name: "Bí ẩn", checked: false },
  { id: "documentary", name: "Tài liệu", checked: false },
  { id: "music", name: "Âm nhạc", checked: false },
  { id: "family", name: "Gia đình", checked: false },
  { id: "sports", name: "Thể thao", checked: false },
  { id: "history", name: "Lịch sử", checked: false },
  { id: "western", name: "Viễn Tây", checked: false },
];

export default function TypeSelection() {
  const store = useContext<any>(StoreContext);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [genreList, setGenreList] = useState<Genre[]>(genres);

  const handleGenreChange = (genreId: string) => {
    setGenreList((prevGenres) =>
      prevGenres.map((genre) =>
        genre.id === genreId ? { ...genre, checked: !genre.checked } : genre
      )
    );

    setSelectedGenres((prev) => {
      if (prev.includes(genreId)) {
        return prev.filter((id) => id !== genreId);
      } else {
        return [...prev, genreId];
      }
    });
  };

  useEffect(() => {
    // Kiểm tra xem store và data đã được khởi tạo chưa
    if (!store?.movies?.data?.data) {
      return;
    }

    // Lọc phim dựa trên thể loại đã chọn
    const filteredMovies = store.movies.data.data.filter((movie: Movie) => {
      if (selectedGenres.length === 0) return true;
      return selectedGenres.some((genre) => movie.genre.includes(genre));
    });

    // Cập nhật danh sách phim đã lọc vào store
    store.movies.setData({
      ...store.movies.data,
      data: filteredMovies,
    });
  }, [selectedGenres, store?.movies?.data]);

  return (
    <div className="w-[100%] shadow-2xl bg-gray-100 rounded text-center text-xl font-semibold pt-3 pb-6 text-indigo-600">
      Thể loại
      <ul
        className={`text-start ${chakra_petch.className} px-3 flex flex-col gap-5 mt-3 text-black`}
      >
        {genreList.map((genre) => (
          <li key={genre.id} className="border-b-2 border-indigo-400">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={genre.checked}
                onChange={() => handleGenreChange(genre.id)}
                className="mr-2"
              />
              {genre.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
