import React, { Suspense, useEffect, useState } from "react";
import QuickBooking from "../QuickBooking/QuickBooking.jsx";
const MovieCard = React.lazy(() => import("components/MovieCard"));
import RoutingContext from "../../utils/RoutingProvider";
import "./HomeContent.scss";
import {Card, Typography, Avatar, Button} from "@mui/material";

const dummyItem = [{ name: "Dummy Movie" }];

const HomeContent = (props) => {
  const [products, setProducts] = useState(dummyItem);

  useEffect(async () => {
    // Add the logic to load the movies from server and set to the state
    const resp = await fetch("http://localhost:5555/products");
    const data = await resp.json();
    setProducts(data);
    console.log(data);
  }, []);

  const productClicked = (item) => {
    if (typeof props.productClicked === "function") {
      props.productClicked(item);
    }
    console.log(item);
  };

  const renderProductList = () => {
    let items = products.map((item) => {
      return (
        <div onClick={() => productClicked(item)} key={item.name}>
          
          <Card sx={{margin : 1, padding : 2, height : '50%', width : '50%'}}><Avatar src={item.imageUrl}> </Avatar><Typography sx={{fontWeight: 'bold'}}>{item.name}</Typography><Button onClick={() => {
            props.routing.history.push("/details/1")
          }}></Button></Card>
        </div>
      );
    });

    return items;
  };

  return (
    <div className="home-content-container">
      <RoutingContext.Provider value={props.routing}>
        
        <div className="movies-container">
          <Suspense fallback={null}>{renderProductList()}</Suspense>
        </div>
      </RoutingContext.Provider>
    </div>
  );
};

export default HomeContent;
