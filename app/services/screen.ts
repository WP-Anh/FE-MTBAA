import { API_ENDPOINTS } from "../config/api";
import { axiosInstance } from "../lib/api";
import {
  Screen,
  ScreenListResponse,
  ScreenDetailResponse,
} from "../types/screen";

interface ApiResponse {
  success: boolean;
  count: number;
  data: Screen[];
}

interface ApiDetailResponse {
  success: boolean;
  data: Screen;
}

export async function getScreenList(): Promise<ScreenListResponse> {
  try {
    const response = await axiosInstance.get<ApiResponse>(
      API_ENDPOINTS.SCREEN.LIST
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
      message: "Lấy danh sách phòng chiếu thành công",
    };
  } catch (error: any) {
    console.error("Get Screen List Error:", error);
    return {
      data: null,
      isPending: false,
      isFetched: true,
      isSuccess: false,
      isError: true,
      message: error.message || "Có lỗi xảy ra khi lấy danh sách phòng chiếu",
    };
  }
}

export async function getScreenDetail(
  _id: string
): Promise<ScreenDetailResponse> {
  try {
    const response = await axiosInstance.get<ApiDetailResponse>(
      API_ENDPOINTS.SCREEN.DETAIL.replace(":id", _id)
    );

    if (!response) {
      throw new Error("Invalid response format from server");
    }

    return {
      data: response as unknown as Screen,
      isPending: false,
      isFetched: true,
      isSuccess: true,
      isError: false,
      message: "Lấy thông tin phòng chiếu thành công",
    };
  } catch (error: any) {
    console.error("Get Screen Detail Error:", error);
    return {
      data: null,
      isPending: false,
      isFetched: true,
      isSuccess: false,
      isError: true,
      message: error.message || "Có lỗi xảy ra khi lấy thông tin phòng chiếu",
    };
  }
}
