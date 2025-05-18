export interface Screen {
  screen: Screen;
  _id: string;
  name: string;
  cinemaId: string;
  capacity: number;
  seats: string[]; // Array of seat IDs
}

export interface ScreenResponse {
  screen: Screen;
}

export interface ScreenListResponse {
  data: Screen[] | null;
  isPending: boolean;
  isFetched: boolean;
  isSuccess: boolean;
  isError: boolean;
  message?: string;
}

export interface ScreenDetailResponse {
  data: Screen | null;
  isPending: boolean;
  isFetched: boolean;
  isSuccess: boolean;
  isError: boolean;
  message?: string;
}
