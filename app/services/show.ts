import { API_ENDPOINTS } from "../config/api";
import { axiosInstance } from "../lib/api";
import { Show, ShowListResponse, ShowDetailResponse } from "../types/show";

interface ApiResponse {
  success: boolean;
  count: number;
  data: Show[];
}

interface ApiDetailResponse {
  success: boolean;
  data: Show;
}

export async function getShowList(): Promise<ShowListResponse> {
  try {
    const response = await axiosInstance.get<ApiResponse>(
      API_ENDPOINTS.SHOW.LIST
    );

    if (!response || !response.data || !Array.isArray(response.data)) {
      throw new Error("Invalid response format from server");
    }

    console.log("Response Ticket: ", response.data);

    return {
      data: response.data,
      isPending: false,
      isFetched: true,
      isSuccess: true,
      isError: false,
      message: "Lấy danh sách suất chiếu thành công",
    };
  } catch (error: any) {
    console.error("Get Show List Error:", error);
    return {
      data: null,
      isPending: false,
      isFetched: true,
      isSuccess: false,
      isError: true,
      message: error.message || "Có lỗi xảy ra khi lấy danh sách suất chiếu",
    };
  }
}

export async function getShowDetail(_id: string): Promise<ShowDetailResponse> {
  try {
    const response = await axiosInstance.get<ApiDetailResponse>(
      API_ENDPOINTS.SHOW.DETAIL.replace(":id", _id)
    );

    if (!response) {
      throw new Error("Invalid response format from server");
    }

    return {
      data: response as unknown as Show,
      isPending: false,
      isFetched: true,
      isSuccess: true,
      isError: false,
      message: "Lấy thông tin suất chiếu thành công",
    };
  } catch (error: any) {
    console.error("Get Show Detail Error:", error);
    return {
      data: null,
      isPending: false,
      isFetched: true,
      isSuccess: false,
      isError: true,
      message: error.message || "Có lỗi xảy ra khi lấy thông tin suất chiếu",
    };
  }
}
