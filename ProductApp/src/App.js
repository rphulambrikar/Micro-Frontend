import React, { Suspense } from "react";
import "./App.scss";
import {AppBar, Typography} from "@mui/material"


import { Switch, Route, useHistory, useLocation } from "react-router-dom";
const HomePage = React.lazy(() => import("homepage/HomePage"));
const DetailsPage = React.lazy(() => import("detailspage/DetailsPage"));
const SeatSelectionPage = React.lazy(() =>
  import("seatselection/SeatSelection")
);
const EnterDetails = React.lazy(() => import("enterdata/EnterDetails"));
const ViewDetails = React.lazy(() => import("viewdata/ViewDetails"));


const App = () => {
  const history = useHistory();
  const location = useLocation();

  const productClicked = (product) => {
    history.push(`details/${product.id}`);
  };

  return (
    <div className="App">
    <AppBar sx={{height: '10%'}}>
        <Typography sx={{margin : 2, fontSize: 22}}>FYNDNA</Typography>
      </AppBar>
    <Switch>
      <Route path="/details/:id">
        <Suspense fallback={null}>
          <DetailsPage routing={{ history, location }} location={location}></DetailsPage>
        </Suspense>
      </Route> */
      /* <Route path="/view">
        <Suspense fallback={null}>
          <ViewDetails routing={{ history, location }} location={location}></ViewDetails>
        </Suspense>
      </Route>
      <Route path="/">
        <Suspense fallback={null}>
          <HomePage>
            productClicked={productClicked}
            routing={{ history, location }}
          </HomePage>
        </Suspense>
      </Route>
      <Route path="/enter">
        <Suspense fallback={null}>
          <EnterDetails routing={{history, location}}></EnterDetails>
        </Suspense>
      </Route>
    </Switch>
    
    </div>
  );
};

export default App;
