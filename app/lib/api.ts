import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "../config/api";

// Tạo instance axios với config mặc định
export const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm request interceptor để log request
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Request:", {
      url: config.url,
      method: config.method,
      data: config.data,
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thêm response interceptor để xử lý lỗi
axiosInstance.interceptors.response.use(
  (response) => {
    // Log response data for debugging
    console.log("Response Data:", response.data);
    return response.data;
  },
  (error: AxiosError) => {
    if (error.response) {
      console.error("Error Response:", {
        status: error.response.status,
        data: error.response.data,
      });
      const data = error.response.data as any;
      return Promise.reject({
        message: data.message || "Something went wrong",
        errors: data.errors,
      });
    }
    return Promise.reject(error);
  }
);
