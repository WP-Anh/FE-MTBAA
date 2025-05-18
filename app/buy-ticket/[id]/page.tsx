"use client";
import React, { useState, useEffect } from "react";
import { getCinemaList } from "../../services/cinema";
import { getScreenList } from "../../services/screen";
import { getShowList } from "../../services/show";
import { getSeatList } from "../../services/seat";
import { getTicketList } from "../../services/ticket";
import { Cinema } from "../../types/cinema";
import { Screen } from "../../types/screen";
import { Show } from "../../types/show";
import { Seat } from "../../types/seat";
import { Ticket } from "../../types/ticket";

const BuyTicketPage: React.FC = () => {
  const [selectedCinema, setSelectedCinema] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [seatsData, setSeatsData] = useState<Seat[]>([]);
  const [cinemasData, setCinemasData] = useState<Cinema[]>([]);
  const [showsData, setShowsData] = useState<Show[]>([]);
  const [screensData, setScreensData] = useState<Screen[]>([]);
  const [ticketsData, setTicketsData] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch seats data
        const seatsResponse = await getSeatList();
        if (seatsResponse.isSuccess && seatsResponse.data) {
          setSeatsData(seatsResponse.data);
        }

        // Fetch cinemas data
        const cinemasResponse = await getCinemaList();
        if (cinemasResponse.isSuccess && cinemasResponse.data) {
          setCinemasData(cinemasResponse.data);
        }

        // Fetch shows data
        const showsResponse = await getShowList();
        if (showsResponse.isSuccess && showsResponse.data) {
          setShowsData(showsResponse.data);
        }

        // Fetch screens data
        const screensResponse = await getScreenList();
        if (screensResponse.isSuccess && screensResponse.data) {
          console.log("Response Screen Data: ", screensResponse.data);

          setScreensData(screensResponse.data);
        }

        // Fetch tickets data
        const ticketsResponse = await getTicketList();
        if (ticketsResponse.isSuccess && ticketsResponse.data) {
          setTicketsData(ticketsResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSeatClick = (seatId: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Đặt vé xem phim</h1>

      {/* Chọn rạp */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Chọn rạp chiếu phim
        </label>
        <select
          className="w-full border rounded px-3 py-2"
          value={selectedCinema}
          onChange={(e) => setSelectedCinema(e.target.value)}
        >
          <option value="">-- Chọn rạp --</option>
          {cinemasData.map((cinema) => (
            <option key={cinema._id} value={cinema._id}>
              {cinema.name}
            </option>
          ))}
        </select>
      </div>

      {/* Chọn ngày */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Chọn ngày xem phim
        </label>
        <input
          type="date"
          className="w-full border rounded px-3 py-2"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* Chọn giờ */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Chọn giờ chiếu phim
        </label>
        <select
          className="w-full border rounded px-3 py-2"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        >
          <option value="">-- Chọn giờ --</option>
          {showsData
            .filter((show) => {
              const showDate = new Date(show.startTime)
                .toISOString()
                .split("T")[0];
              return showDate === selectedDate;
            })
            .map((show) => (
              <option
                key={show._id}
                value={new Date(show.startTime).toLocaleTimeString()}
              >
                {new Date(show.startTime).toLocaleTimeString()}
              </option>
            ))}
        </select>
      </div>

      {/* Chọn ghế */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Chọn ghế ngồi
        </label>
        <div className="grid grid-cols-8 gap-2">
          {seatsData.map((seat) => (
            <button
              key={seat._id}
              type="button"
              className={`p-2 rounded border text-sm font-semibold transition-colors
                ${
                  selectedSeats.includes(seat._id)
                    ? "bg-blue-500 text-white border-blue-500"
                    : seat.status === "occupied"
                    ? "bg-red-100 text-gray-400 border-gray-300 cursor-not-allowed"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                }
              `}
              onClick={() => handleSeatClick(seat._id)}
              disabled={seat.status === "occupied"}
            >
              {seat.row}-{seat.number}
            </button>
          ))}
        </div>
      </div>

      {/* Thông tin đã chọn */}
      <div className="mt-8 p-4 border rounded bg-gray-50">
        <h2 className="text-lg font-semibold mb-2">Thông tin đặt vé</h2>
        <div>
          Rạp: {cinemasData.find((c) => c._id === selectedCinema)?.name || "-"}
        </div>
        <div>Ngày: {selectedDate || "-"}</div>
        <div>Giờ: {selectedTime || "-"}</div>
        <div>
          Ghế: {selectedSeats.length > 0 ? selectedSeats.join(", ") : "-"}
        </div>
      </div>
    </div>
  );
};

export default BuyTicketPage;
