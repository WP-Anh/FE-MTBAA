import { API_ENDPOINTS } from "../config/api";
import { axiosInstance } from "../lib/api";
import {
  Ticket,
  TicketListResponse,
  TicketDetailResponse,
} from "../types/ticket";

interface ApiResponse {
  success: boolean;
  count: number;
  data: Ticket[];
}

interface ApiDetailResponse {
  success: boolean;
  data: Ticket;
}

export async function getTicketList(): Promise<TicketListResponse> {
  try {
    const response = await axiosInstance.get<ApiResponse>(
      API_ENDPOINTS.TICKET.LIST
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
      message: "Lấy danh sách vé thành công",
    };
  } catch (error: any) {
    console.error("Get Ticket List Error:", error);
    return {
      data: null,
      isPending: false,
      isFetched: true,
      isSuccess: false,
      isError: true,
      message: error.message || "Có lỗi xảy ra khi lấy danh sách vé",
    };
  }
}

export async function getTicketDetail(
  _id: string
): Promise<TicketDetailResponse> {
  try {
    const response = await axiosInstance.get<ApiDetailResponse>(
      API_ENDPOINTS.TICKET.DETAIL.replace(":id", _id)
    );

    if (!response) {
      throw new Error("Invalid response format from server");
    }

    return {
      data: response as unknown as Ticket,
      isPending: false,
      isFetched: true,
      isSuccess: true,
      isError: false,
      message: "Lấy thông tin vé thành công",
    };
  } catch (error: any) {
    console.error("Get Ticket Detail Error:", error);
    return {
      data: null,
      isPending: false,
      isFetched: true,
      isSuccess: false,
      isError: true,
      message: error.message || "Có lỗi xảy ra khi lấy thông tin vé",
    };
  }
}
