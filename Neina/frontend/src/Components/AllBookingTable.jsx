import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './AllBookingTable.css';

function AllBookingTable() {
  const [table, setTable] = useState([]);

  // Fetch all bookings
  let handleAllTable = async () => {
    try {
      let response = await axios.get("https://resturenttablebookingbackend.onrender.com/all");
      setTable(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Handle checkout (delete booking)
  let handleCheckout = async (id) => {
    try {
      let data = await axios.delete(`https://resturenttablebookingbackend.onrender.com/booking/${id}`);
      console.log(data);
      handleAllTable();  // Refresh the table after checkout
    } catch (err) {
      console.log(err);
    }
  };

  // Format date into YYYY/MM/DD format
  let handleDate = (dateString) => {
    let date = new Date(dateString);
    let day = (date.getDay()).toString().padStart(2, "0");
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let year = date.getFullYear();

    return `${year}/${month}/${day}`;
  };

  // Fetch all bookings on component mount
  useEffect(() => {
    handleAllTable();
  }, []);

  return (
    <div className="all-bookings-container">
      <h1 className="table-title">All Booking Table List</h1>
      {table.length !== 0 ? (
        <table className="booking-table">
          <thead>
            <tr className="table-header">
              <th className="header-column">Booking ID</th>
              <th className="header-column">Name</th>
              <th className="header-column">Contact</th>
              <th className="header-column">Date</th>
              <th className="header-column">Time</th>
              <th className="header-column">Action</th>
            </tr>
          </thead>
          <tbody>
            {table.map((el, i) => (
              <tr key={i} className="table-row">
                <td className="table-cell">{el._id}</td>
                <td className="table-cell">{el.name}</td>
                <td className="table-cell">{el.contact}</td>
                <td className="table-cell">{handleDate(el.date)}</td>
                <td className="table-cell">{el.time}</td>
                <td className="table-cell">
                  <button
                    onClick={() => handleCheckout(el._id)}
                    className="checkout-button"
                  >
                    CheckOut
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p ></p>
      )}
    </div>
  );
}

export default AllBookingTable;
