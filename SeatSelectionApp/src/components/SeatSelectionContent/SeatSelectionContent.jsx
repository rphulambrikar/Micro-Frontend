import React, { useEffect, useState } from "react";
import "./SeatSelectionContent.scss";
import {AppBar, Typography} from "@mui/material";

const SeatSelectionContent = (props) => {
  const [bookingData, setBookingData] = useState({
    products: "Select products",
    date: "Select Date",
    time: "Select Time",
    imageUrl: "",
  });
  const [seatsCount, setSeatsCount] = useState(0);

  const loadBooking = async (booking) => {
    const resp = await fetch("http://localhost:5555/products");
    const data = await resp.json();

    const selectedproducts = data.filter((products) => {
      return products.id === parseInt(booking.products);
    });

    setBookingData({
      products: selectedproducts[0].name,
      date: booking.date,
      time: booking.time,
      imageUrl: selectedproducts[0].imageUrl,
    });
  };

  useEffect(() => {
    import("productapp/ProductData").then((module) => {
      const ProductData = module.default;
      ProductData.subscribe({
        next: (val) => {
          console.log(`products data received is`, val)
          loadBooking(val);
        },
      });
    });
  }, []);

  const renderImage = () => {
    const imgUrl = `http://localhost:5555/images/${bookingData.imageUrl}`;
    return <img src={imgUrl}></img>;
  };

  const toggleSeatSelection = (e) => {
    if (e.target.classList.contains("selected")) {
      setSeatsCount(seatsCount - 1);
    } else {
      setSeatsCount(seatsCount + 1);
    }
    e.target.classList.toggle("selected");
  };

  const renderSeats = () => {
    let seats = [1, 2, 3, 4, 5, 6, 7];
    return seats.map((seat) => (
      <div className="seat" key={seat} onClick={toggleSeatSelection}>
        {seat}
      </div>
    ));
  };

  const seatsBooked = () => {
    alert(
      `products Booked ${bookingData.products}, seats Booked ${seatsCount} -- ENJOY !!!!!`
    );
  };

  return (
    <div className="seat-selection-container">
      
      <div className="column full-width p-20">
        <span className="products-title">{bookingData.products}</span>
        <span className="mt-2"> Book products</span>
        <span className="mt-2">
          Selected Date : <strong>{bookingData.date}</strong>
        </span>
        <span className="mt-2">
          Time Selected : <strong>{bookingData.time}</strong>
        </span>

        <div className="screen-select-container mt-2">
          <div className="screen">Screen</div>
          <div className="seats-container mt-2">{renderSeats()}</div>
        </div>

        <div className="row mt-2 space-between">
          <span>
            Selected Seats : <strong>{seatsCount}</strong>
          </span>
          <span>
            Total Cost <strong>{seatsCount * 10}$</strong>
          </span>
          <button onClick={seatsBooked}>Book</button>
        </div>
      </div>
    </div>
  );
};

export default SeatSelectionContent;
