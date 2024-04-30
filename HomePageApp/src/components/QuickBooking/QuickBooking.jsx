import React, { Suspense, useState } from "react";
const Typography = React.lazy(() => import("components/Typography"));
import "./QuickBooking.scss";
import RoutingContext from "../../utils/RoutingProvider";


const QuickBooking = () => {
  const [movie, setMovie] = useState("1");
  const [date, setDate] = useState("01/02/2022");
  const [time, setTime] = useState("10 Am");

  const bookMovie = (context) => {
    const booking = {
      movie,
      date,
      time,
    };
    console.log(booking);
    import("productapp/productData").then((module) => {
      const productData = module.default;
      productData.next(booking);
    });
    context.history.push("book");
  };

  return (
    <RoutingContext.Consumer>
      {(context) => (
        <div className="quick-booking-container">
          <Suspense fallback={null}>
            <Typography text="FYNDNA" type="header"></Typography>
          </Suspense>
          
          <div className="spacer"></div>
          <div className="mr-1">
            <span>Select Product</span>
            <select onChange={(e) => setMovie(e.target.value)} value={movie}>
              <option value="1">Party Primary Information</option>
              
            </select>
          </div>
          
          <button onClick={() => bookMovie(context)}>Submit</button>
        </div>
      )}
    </RoutingContext.Consumer>
  );
};

export default QuickBooking;
