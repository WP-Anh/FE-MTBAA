import { API_ENDPOINTS } from "../config/api";
import { axiosInstance } from "../lib/api";
import {
  RegisterRequest,
  RegisterResponse,
  LoginRequest,
  LoginResponse,
  AuthResponse,
} from "../types/auth";

export async function register(
  data: RegisterRequest
): Promise<RegisterResponse> {
  try {
    const response = (await axiosInstance.post(
      API_ENDPOINTS.AUTH.REGISTER,
      data
    )) as AuthResponse;

    return {
      data: response,
      isPending: false,
      isFetched: true,
      isSuccess: true,
      isError: false,
      message: "Đăng ký thành công",
    };
  } catch (error: any) {
    return {
      data: null,
      isPending: false,
      isFetched: true,
      isSuccess: false,
      isError: true,
      message: error.message || "Có lỗi xảy ra khi đăng ký",
    };
  }
}

export async function login(data: LoginRequest): Promise<LoginResponse> {
  try {
    const response = (await axiosInstance.post(
      API_ENDPOINTS.AUTH.LOGIN,
      data
    )) as AuthResponse;

    // Log the full response to debug
    console.log("Login API Response:", response);

    // Check if response has the expected structure
    if (!response || !response.token) {
      throw new Error("Invalid response format from server");
    }

    return {
      data: response,
      isPending: false,
      isFetched: true,
      isSuccess: true,
      isError: false,
      message: "Đăng nhập thành công",
    };
  } catch (error: any) {
    console.error("Login Error:", error);
    return {
      data: null,
      isPending: false,
      isFetched: true,
      isSuccess: false,
      isError: true,
      message: error.message || "Có lỗi xảy ra khi đăng nhập",
    };
  }
}
