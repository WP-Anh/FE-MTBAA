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
  SEAT: {
    LIST: "/seats/get",
    DETAIL: "/seats/:id",
  },
  SHOW: {
    LIST: "/shows/get",
    DETAIL: "/shows/:id",
  },
  CINEMA: {
    LIST: "/cinemas/get",
    DETAIL: "/cinemas/:id",
  },
  SCREEN: {
    LIST: "/screens/get",
    DETAIL: "/screens/:id",
  },
  TICKET: {
    LIST: "/tickets/get",
    DETAIL: "/tickets/:id",
  },
} as const;
