export interface Movie {
  movie: Movie;
  _id: string;
  title: string;
  description: string;
  releaseDate: Date;
  duration: number;
  genre: string[];
  director: string;
  cast: string[];
  posterUrl: string;
  trailerUrl: string;
  img: string[];
  rating: number;
  price: number;
}

export interface MovieResponse {
  movie: Movie;
}

export interface MovieListResponse {
  data: Movie[] | null;
  isPending: boolean;
  isFetched: boolean;
  isSuccess: boolean;
  isError: boolean;
  message?: string;
}

export interface MovieDetailResponse {
  data: Movie | null;
  isPending: boolean;
  isFetched: boolean;
  isSuccess: boolean;
  isError: boolean;
  message?: string;
}
