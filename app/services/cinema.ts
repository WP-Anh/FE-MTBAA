import { API_ENDPOINTS } from "../config/api";
import { axiosInstance } from "../lib/api";
import {
  Cinema,
  CinemaListResponse,
  CinemaDetailResponse,
} from "../types/cinema";

interface ApiResponse {
  success: boolean;
  count: number;
  data: Cinema[];
}

interface ApiDetailResponse {
  success: boolean;
  data: Cinema;
}

export async function getCinemaList(): Promise<CinemaListResponse> {
  try {
    const response = await axiosInstance.get<ApiResponse>(
      API_ENDPOINTS.CINEMA.LIST
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
      message: "Lấy danh sách rạp chiếu phim thành công",
    };
  } catch (error: any) {
    console.error("Get Cinema List Error:", error);
    return {
      data: null,
      isPending: false,
      isFetched: true,
      isSuccess: false,
      isError: true,
      message:
        error.message || "Có lỗi xảy ra khi lấy danh sách rạp chiếu phim",
    };
  }
}

export async function getCinemaDetail(
  _id: string
): Promise<CinemaDetailResponse> {
  try {
    const response = await axiosInstance.get<ApiDetailResponse>(
      API_ENDPOINTS.CINEMA.DETAIL.replace(":id", _id)
    );

    if (!response) {
      throw new Error("Invalid response format from server");
    }

    return {
      data: response as unknown as Cinema,
      isPending: false,
      isFetched: true,
      isSuccess: true,
      isError: false,
      message: "Lấy thông tin rạp chiếu phim thành công",
    };
  } catch (error: any) {
    console.error("Get Cinema Detail Error:", error);
    return {
      data: null,
      isPending: false,
      isFetched: true,
      isSuccess: false,
      isError: true,
      message:
        error.message || "Có lỗi xảy ra khi lấy thông tin rạp chiếu phim",
    };
  }
}
