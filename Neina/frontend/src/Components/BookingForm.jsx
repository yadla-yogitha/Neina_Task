import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import './BookingFrom.css'

export default function BookingForm({ onBookingSuccess }) {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !time || !name || !contact || guests < 1) {
      setError('Please fill in all the fields.');
      return;
    }

    // Validate the entered time
    const timeSlotPattern = /^(1[0-2]|0?[1-9]):([0-5][0-9])$/; // Validates time in 12-hour format (e.g., 12:00, 1:00, etc.)
    if (!timeSlotPattern.test(time)) {
      setError('Please enter a valid time slot (e.g., 12:00, 1:00, etc.).');
      return;
    }

    try {
      const response = await axios.post('https://resturenttablebookingbackend.onrender.com/booking', {
        name,
        contact,
        date: date.toISOString(),
        time,
        numberOfGuests: guests,
      });
      onBookingSuccess(response.data.data._id);
    } catch (err) {
      setError('Error submitting the booking. Please try again.');
    }
  };

  // Fetch available time slots based on the selected date
  useEffect(() => {
    if (date) {
      const fetchAvailableSlots = async () => {
        try {
          console.log('Fetching available slots for date:', date.toISOString());
          const response = await axios.get(
            `https://resturenttablebookingbackend.onrender.com/availableslot?date=${date.toISOString()}`
          );
          console.log('Available slots from backend:', response.data);
          setAvailableSlots(response.data.availableSlots || []);
        } catch (err) {
          console.error("Error fetching available slots:", err);
          setError('Unable to fetch available slots. Please try again.');
        }
      };
      fetchAvailableSlots();
    }
  }, [date]);

  return (
    <div>
      <h1 >Book a Table</h1>
      <form onSubmit={handleSubmit} >
        {error && <p >{error}</p>}

        <div >
          <div>
            <label>Date</label>
            <DatePicker
            
              selected={date}
              onChange={(date) => setDate(date)}
              minDate={new Date()}
              dateFormat="yyyy/MM/dd"
              required
            />
          </div>

          <div>
            <label>Time</label>
            <input
              type="text"
           
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="Enter time (e.g., 12:00)"
              required
            />
          </div>
        </div>

        <div >
          <div>
            <label>Number of Guests</label>
            <input
            
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              min="1"
              required
            />
          </div>

          <div className='mt-4'>
            <label>Your Name</label>
            <input
              type="text"
             
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        </div>

        <div >
          <div>
            <label>Contact Information</label>
            <input
              type="text"
          
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>

          <button

            type="submit"
          >
            Book Now
          </button>
        </div>
      </form>
    </div>
  );
}
