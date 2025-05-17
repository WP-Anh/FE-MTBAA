"use client";
import { useContext } from "react";
import TypeSelection from "../ui/movie_type/type";
import List from "../ui/movie_list/mvlist";
import { StoreContext } from "../store/StoreProvider";

export default function MovieList() {
  const store = useContext<any>(StoreContext);

  return (
    <div className="main flex gap-8 w-full my-10 justify-center">
      {/* Chọn thể loại */}
      <div className="w-[15%]">
        <TypeSelection />
      </div>
      <div className="w-[80%]">
        {store.movie.data?.isPending ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang tải danh sách phim...</p>
          </div>
        ) : store.movie.data?.isError ? (
          <div className="text-center py-10">
            <p className="text-red-600">
              {store.movie.data.message ||
                "Có lỗi xảy ra khi tải danh sách phim"}
            </p>
          </div>
        ) : (
          <List />
        )}
      </div>
    </div>
  );
}
