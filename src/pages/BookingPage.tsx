import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "../types/Movie";

interface Seat {
  id: string;
  row: number;
  number: number;
  status: "available" | "selected" | "occupied";
}

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`/api/movies/${id}`);
        if (!response.ok) {
          throw new Error("Movie not found");
        }
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovie();
    }
  }, [id]);

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === "occupied") return;

    setSelectedSeats((prev) => {
      const isSelected = prev.some((s) => s.id === seat.id);
      if (isSelected) {
        return prev.filter((s) => s.id !== seat.id);
      } else {
        return [...prev, { ...seat, status: "selected" }];
      }
    });
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        {error || "Movie not found"}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Book Tickets for {movie.title}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Select Date and Time</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                value={selectedDate.toISOString().split("T")[0]}
                onChange={(e) => handleDateChange(new Date(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <select
                value={selectedTime}
                onChange={(e) => handleTimeChange(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Select a time</option>
                <option value="10:00">10:00 AM</option>
                <option value="13:00">1:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="19:00">7:00 PM</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Select Seats</h2>
          <div className="grid grid-cols-8 gap-2">
            {Array.from({ length: 40 }, (_, i) => ({
              id: `seat-${i + 1}`,
              row: Math.floor(i / 8) + 1,
              number: (i % 8) + 1,
              status: "available" as const,
            })).map((seat) => (
              <button
                key={seat.id}
                onClick={() => handleSeatClick(seat)}
                className={`p-2 rounded ${
                  seat.status === "occupied"
                    ? "bg-gray-300 cursor-not-allowed"
                    : selectedSeats.some((s) => s.id === seat.id)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                disabled={seat.status === "occupied"}
              >
                {seat.number}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Selected Seats</h2>
        {selectedSeats.length > 0 ? (
          <div className="space-y-2">
            {selectedSeats.map((seat) => (
              <div key={seat.id} className="flex items-center justify-between">
                <span>
                  Row {seat.row}, Seat {seat.number}
                </span>
                <span>${movie.price}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2">
              <div className="flex items-center justify-between font-semibold">
                <span>Total</span>
                <span>${selectedSeats.length * movie.price}</span>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No seats selected</p>
        )}
      </div>
    </div>
  );
};

export default BookingPage;
