import React, { useEffect, useState } from "react";
import "./DetailsContent.scss";
import {Button, Card, Stack, AppBar, Typography} from '@mui/material';
import {useLocation} from 'react-router-dom';

import Axios from 'axios';



const DetailsContent = (props) => {
  const [movie, setMovie] = useState([{name : '', imageUrl : '', description : ''}]);
  const [date, setDate] = useState("01/02/2022");
  const [time, setTime] = useState("10 Am");
  const { pathname } = useLocation();

 const  baseUrl = "http://localhost:5555/products";

const [nik,setNik]=useState([]);

 useEffect(()=>{
    Axios.get(baseUrl).then((res)=>{
        setNik(res.data);
    });
    const selectedProduct = data.filter((movie) => {
          return nik.id === parseInt(id);
        });
    
        console.log(selectedProduct);
    
        setNik(selectedProduct[0]);
      
 },[]);
 nik.map((item)=>{
  const{id,name,imageUrl,description}=item;
  console.log("###",id,name,imageUrl,description);
  
}
)
console.log("nik", nik)
  
  

 



  const EnterData = () => {
    const booking = {
      movie: movie.id,
      date,
      time,
    };

    import("productapp/ProductData").then((module) => {
      const movieData = module.default;
      movieData.next(booking);
      props.routing.history.push("/enter");
    });
  }

  const ViewData = () => {
    const booking = {
      movie: movie.id,
      date,
      time,
    };

    import("productapp/ProductData").then((module) => {
      const movieData = module.default;
      movieData.next(booking);
      props.routing.history.push("/view");
    });
  };

  return (
    <div className="details-content-container">
      <AppBar sx={{height: '10%'}}>
        <Typography sx={{margin : 2, fontSize: 22}}>FYNDNA</Typography>
      </AppBar>
      <div className="details-content-row">
        {/* {renderImage()} */}
        <div className="details-content-column ml-2">
          <Card sx={{alignContent: 'center', marginLeft: -2, width: '90%', marginTop : 10, padding: 2, borderRadius : 7}}>
          <div>
            <h3 className="movie-title">{nik.name}</h3>
            <br></br>
            <h5 className="description">{nik.description}</h5>
          </div>
          <br></br>
          <Stack flexDirection={'row'} >
          <Button onClick={EnterData} variant="contained">Enter</Button>
          <Button sx={{marginLeft : '1%'}}onClick={ViewData} variant="contained">View</Button>
          </Stack>
          <br></br>
          </Card>
        </div>
      </div>
      <br></br>
  
    </div>
  );
};

export default DetailsContent;
