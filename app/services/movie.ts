import { API_ENDPOINTS } from "../config/api";
import { axiosInstance } from "../lib/api";
import {
  Movie,
  MovieListResponse,
  MovieDetailResponse,
  MovieResponse,
} from "../types/movie";

interface ApiResponse {
  success: boolean;
  count: number;
  data: Movie[];
}

interface ApiDetailResponse {
  success: boolean;
  data: Movie;
}

export async function getMovieList(): Promise<MovieListResponse> {
  try {
    const response = await axiosInstance.get<ApiResponse>(
      API_ENDPOINTS.MOVIE.LIST
    );

    if (!response || !response.data || !Array.isArray(response.data)) {
      throw new Error("Invalid response format from server");
    }

    return {
      data: response.data,
      isPending: false,
      isFetched: true,
      isSuccess: true,
      isError: false,
      message: "Lấy danh sách phim thành công",
    };
  } catch (error: any) {
    console.error("Get Movie List Error:", error);
    return {
      data: null,
      isPending: false,
      isFetched: true,
      isSuccess: false,
      isError: true,
      message: error.message || "Có lỗi xảy ra khi lấy danh sách phim",
    };
  }
}

export async function getMovieDetail(
  _id: string
): Promise<MovieDetailResponse> {
  try {
    const response = await axiosInstance.get<ApiDetailResponse>(
      API_ENDPOINTS.MOVIE.MOVIE_DETAIL.replace(":id", _id)
    );

    if (!response) {
      throw new Error("Invalid response format from server");
    }

    return {
      data: response as unknown as Movie,
      isPending: false,
      isFetched: true,
      isSuccess: true,
      isError: false,
      message: "Lấy thông tin phim thành công",
    };
  } catch (error: any) {
    console.error("Get Movie Detail Error:", error);
    return {
      data: null,
      isPending: false,
      isFetched: true,
      isSuccess: false,
      isError: true,
      message: error.message || "Có lỗi xảy ra khi lấy thông tin phim",
    };
  }
}
