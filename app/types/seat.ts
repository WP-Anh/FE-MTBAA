export interface Seat {
  seat: Seat;
  _id: string;
  row: number;
  number: number;
  status: "available" | "selected" | "occupied";
  screenId: string;
  price: number;
}

export interface SeatResponse {
  seat: Seat;
}

export interface SeatListResponse {
  data: Seat[] | null;
  isPending: boolean;
  isFetched: boolean;
  isSuccess: boolean;
  isError: boolean;
  message?: string;
}

export interface SeatDetailResponse {
  data: Seat | null;
  isPending: boolean;
  isFetched: boolean;
  isSuccess: boolean;
  isError: boolean;
  message?: string;
}
