export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface RegisterResponse {
  data: AuthResponse | null;
  isPending: boolean;
  isFetched: boolean;
  isSuccess: boolean;
  isError: boolean;
  message?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: AuthResponse | null;
  isPending: boolean;
  isFetched: boolean;
  isSuccess: boolean;
  isError: boolean;
  message?: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
