export interface Ticket {
  ticket: Ticket;
  _id: string;
  showId: string;
  userId: string;
  screenID: string;
  seatID: string; // Array of seat IDs
  price: number;
  status: "pending" | "confirmed" | "cancelled" | "used";
  expiresAt: Date;
}

export interface TicketResponse {
  ticket: Ticket;
}

export interface TicketListResponse {
  data: Ticket[] | null;
  isPending: boolean;
  isFetched: boolean;
  isSuccess: boolean;
  isError: boolean;
  message?: string;
}

export interface TicketDetailResponse {
  data: Ticket | null;
  isPending: boolean;
  isFetched: boolean;
  isSuccess: boolean;
  isError: boolean;
  message?: string;
}
