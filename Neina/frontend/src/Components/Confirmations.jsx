import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './BookingSummary.css'; // Import the CSS file

export default function BookingSummary() {
  const [detail, setDetail] = useState({});
  const { id: bookingId } = useParams();

  const handleDetail = async (bookingId) => {
    try {
      let response = await axios.get(`https://resturenttablebookingbackend.onrender.com/booking/${bookingId}`);
      setDetail(response.data.booking);
    } catch (error) {
      console.error("Error fetching booking details:", error);
    }
  };

  const handleDate = (dateString) => {
    let date = new Date(dateString);
    let day = date.getDate().toString().padStart(2, "0");
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let year = date.getFullYear();
    return `${year}/${month}/${day}`;
  };

  useEffect(() => {
    handleDetail(bookingId);
  }, [bookingId]);

  return (
    <div className="booking-summary-container">
      <div className="booking-summary-card">
        <h1 className="booking-summary-title">Booking Confirmed!</h1>
        <p className="booking-summary-text">Your table has been successfully booked. Here are the details:</p>
        <div className="booking-details">
          <p><strong>Booking ID:</strong> {bookingId}</p>
          <p><strong>Name:</strong> {detail.name}</p>
          <p><strong>Contact:</strong> {detail.contact}</p>
          <p><strong>Date:</strong> {handleDate(detail.date)}</p>
          <p><strong>Time:</strong> {detail.time}</p>
        </div>
      </div>
    </div>
  );
}
