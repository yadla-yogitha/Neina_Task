import BookingForm from './BookingForm';
import { useNavigate, Link } from 'react-router-dom';

import './Home.css';
 function Home() {
  let navigate=useNavigate();
  
  const handleBookingSuccess = (bookingData) => {
            navigate(`/confirm/${bookingData}`);
  };

  return (
    <div className='mt-5 mx-5'>
      <Link  to="/all">All Booking List</Link>
      <BookingForm onBookingSuccess={handleBookingSuccess}/>
    </div>
  );
}

export default Home;
