export interface Cinema {
  cinema: Cinema;
  _id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  screens: string[]; // Array of screen IDs
  status: "active" | "inactive";
  openingHours: {
    open: string;
    close: string;
  };
}

export interface CinemaResponse {
  cinema: Cinema;
}

export interface CinemaListResponse {
  data: Cinema[] | null;
  isPending: boolean;
  isFetched: boolean;
  isSuccess: boolean;
  isError: boolean;
  message?: string;
}

export interface CinemaDetailResponse {
  data: Cinema | null;
  isPending: boolean;
  isFetched: boolean;
  isSuccess: boolean;
  isError: boolean;
  message?: string;
}
