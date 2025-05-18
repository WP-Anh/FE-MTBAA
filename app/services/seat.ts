import { API_ENDPOINTS } from "../config/api";
import { axiosInstance } from "../lib/api";
import { Seat, SeatListResponse, SeatDetailResponse } from "../types/seat";

interface ApiResponse {
  success: boolean;
  count: number;
  data: Seat[];
}

interface ApiDetailResponse {
  success: boolean;
  data: Seat;
}

export async function getSeatList(): Promise<SeatListResponse> {
  try {
    const response = await axiosInstance.get<ApiResponse>(
      API_ENDPOINTS.SEAT.LIST
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
      message: "Lấy danh sách ghế thành công",
    };
  } catch (error: any) {
    console.error("Get Seat List Error:", error);
    return {
      data: null,
      isPending: false,
      isFetched: true,
      isSuccess: false,
      isError: true,
      message: error.message || "Có lỗi xảy ra khi lấy danh sách ghế",
    };
  }
}

export async function getSeatDetail(_id: string): Promise<SeatDetailResponse> {
  try {
    const response = await axiosInstance.get<ApiDetailResponse>(
      API_ENDPOINTS.SEAT.DETAIL.replace(":id", _id)
    );

    if (!response) {
      throw new Error("Invalid response format from server");
    }

    return {
      data: response as unknown as Seat,
      isPending: false,
      isFetched: true,
      isSuccess: true,
      isError: false,
      message: "Lấy thông tin ghế thành công",
    };
  } catch (error: any) {
    console.error("Get Seat Detail Error:", error);
    return {
      data: null,
      isPending: false,
      isFetched: true,
      isSuccess: false,
      isError: true,
      message: error.message || "Có lỗi xảy ra khi lấy thông tin ghế",
    };
  }
}
