export const API_BASE_URL = "http://localhost:3050";

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "/users/register",
    LOGIN: "/users/login",
  },
  MOVIE: {
    LIST: "/movies/get",
    MOVIE_DETAIL: "/movies/:id",
  },
} as const;
