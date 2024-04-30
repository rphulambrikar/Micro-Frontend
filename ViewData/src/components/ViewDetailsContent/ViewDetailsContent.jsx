import React, { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom';
import "./ViewDetailsContent.scss";
import { Button, Stack, TextField, Typography, Card, AppBar} from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const ViewDetailsContent = (props) => {

  
  

  const [bookingData, setBookingData] = useState({
    product: "Select product",
    date: "Select Date",
    time: "Select Time",
    imageUrl: "",
  });
  const [partyId, setPartyId] = useState('');
  const [customerDetails, setCustomerDetails] = useState([])
  
  const [firstName, setFirstName] = useState()
  const [middleName, setMiddleName] = useState()
  const [lastName, setLastName] = useState()

  
  

 
  const handleButtonOnClick = async () => {
    try {
      const res =  await fetch(`http://localhost:9090/party-write/party-primary-information?partyId=${partyId}`);
      const info = await res.json();
      console.log(typeof(info));
      setCustomerDetails(info.data);


      setFirstName(customerDetails.partyName.name.firstName)
      setMiddleName(customerDetails.partyName.name.middleName)
      setLastName(customerDetails.partyName.name.lastName)



      console.log("Original Response" + res)
      console.log("Response" + JSON.stringify(info));

      console.log("Checking Name Entry",customerDetails.partyName)
      
      console.log("Checking First Name", firstName)
      
    
     
      
      
    }catch (error) {
      // console.error('Error Fetching from the api', error);
    }
  };

  const rows = [
    { id: 1, firstName: firstName ,middleName : middleName,lastName : lastName,nationality: customerDetails.nationality,customerSince: customerDetails.customerSince, ageStatus: customerDetails.ageStatus , gender: customerDetails.gender},
    
  ];

  const handleOnDelete = () => {
    
    axios.delete(`http://localhost:9090/party-write/party-primary-information?partyId=${partyId}`)
    alert("Party Data Successfully Deleted\nRedirecting to Home Page")
    props.routing.history.push("/")

    
 
    
    
  }

  

  
  const [seatsCount, setSeatsCount] = useState(0);
 

  const loadBooking = async (booking) => {
    const resp = await fetch("http://localhost:5555/products");
    const data = await resp.json();

    const selectedproduct = data.filter((product) => {
      return product.id === parseInt(booking.product);
    });

   
  



  
    setBookingData({
      product: selectedproduct[0].name,
      date: booking.date,
      time: booking.time,
      imageUrl: selectedproduct[0].imageUrl,
    });
  };


  useEffect(() => {
    import("productapp/ProductData").then((module) => {
      const productData = module.default;
      productData.subscribe({
        next: (val) => {
          console.log(`product data received is`, val)
          loadBooking(val);
        },
      });
    });
  }, []);

  


  const columns = [
    { field: 'id', headerName: 'ID', width: 20 },
    {
      field: 'firstName',
      headerName: 'First Name',
      width: 120,
      editable: true,
    },
    {
      field: 'middleName',
      headerName: 'Middle Name',
      width: 120,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      width: 120,
      editable: true,
    },
    {
      field: 'ageStatus',
      headerName: 'Age Status',
      width: 110,
      editable: true,
    },
    {
      field: 'gender',
      headerName: 'Gender',
      width: 110,
      editable: true,
    },
    {
      field: 'nationality',
      headerName: 'Nationality',
      width: 110,
      editable: true,
    },
    {
      field: 'customerSince',
      headerName: 'Customer Since',
      width: 200,
      editable: true,
    },

    
    

  ];
  // const fn = customerDetails.partyName.name.firstName;
  // const fn1 = JSON.stringify(fn)
  
  
  const renderImage = () => {
    const imgUrl = `http://localhost:5555/images/${bookingData.imageUrl}`;
    return <img src={imgUrl}></img>;
  };

  const toggleFastTagDetails = (e) => {
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
      <div className="seat" key={seat} onClick={toggleFastTagDetails}>
        {seat}
      </div>
    ));
  };

  const seatsBooked = () => {
    alert(
      `product Booked ${bookingData.product}, seats Booked ${seatsCount} -- ENJOY !!!!!`
    );
  };
  

  return (
    <div className="seat-selection-container">
      <AppBar sx={{height: '10%'}}>
        <Typography sx={{margin : 2, fontSize: 22}}>FYNDNA</Typography>
      </AppBar>
      
      
      <div className="column full-width p-20">

        
        <Card sx={{alignContent: 'center', alignItems : 'center', marginTop: 5, borderRadius : 5}}>
      <Typography sx={{margin: 1}} variant="h6">Enter Party ID</Typography>

      <TextField
              margin="normal"
              sx={{width : '30%', margin: '1%'}}
              required
              id="partyID"
              label="Party Id"
              name="PartyId"
              autoComplete="partyId"
              autoFocus
              onChange={(e) => setPartyId(e.target.value)}
            />
        <Button variant="contained" sx={{alignItems : 'center', margin: '1%', padding: 1}} onClick={handleButtonOnClick}>Search</Button>
        <Button variant="contained" sx={{alignItems : 'center', margin: '1%', padding: 1}} onClick={handleOnDelete}>Delete</Button>
        </Card>

        <br></br>
        


        <Card sx={{borderRadius : 5}}>

        <Typography sx={{margin : 1}}variant="h6">Check Details: </Typography>
        <br></br>

        
        {customerDetails ?
        <DataGrid
        sx={{padding : 2}}
        columns={columns}
        rows={rows}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 1,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
      : 
      <Typography>No Details Found, Enter Valid Data</Typography>
      }
      
      </Card>
      
        
        
      

    </div>

    </div>
    
  );
};

export default ViewDetailsContent;
