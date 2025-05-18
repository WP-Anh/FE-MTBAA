export interface Show {
  show: Show;
  _id: string;
  movieId: string;
  screenId: string;
  startTime: Date;
  endTime: Date;
}

export interface ShowResponse {
  show: Show;
}

export interface ShowListResponse {
  data: Show[] | null;
  isPending: boolean;
  isFetched: boolean;
  isSuccess: boolean;
  isError: boolean;
  message?: string;
}

export interface ShowDetailResponse {
  data: Show | null;
  isPending: boolean;
  isFetched: boolean;
  isSuccess: boolean;
  isError: boolean;
  message?: string;
}
