import React, { useEffect, useState } from "react";
import "./EnterDetailsContent.scss";
import axios from 'axios';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Stack,
  TextField,
  Typography,
  AppBar,
  Select,
  MenuItem,
  InputLabel,
  Card
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const EnterDetailsContent = () => {
  const [bookingData, setBookingData] = useState({
    product: "Select product",
    date: "Select Date",
    time: "Select Time",
    imageUrl: "",
  });
  
  const [partyId, setPartyId] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [middle_name, setMiddle_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [seatsCount, setSeatsCount] = useState(0);

  const party = {
    "party_id": partyId,
    "version": 2,
    "status": "ACTIVE",
    "json_content": {
        "partyType": "INDIVIDUAL",
        "partyName": {
            "name": {
                "prefix": "MR",
                "firstName": first_name,
                "middleName": middle_name,
                "lastName": last_name,
                "fullName": first_name + last_name
            },
            "maidenName": {
                "prefix": "MR",
                "firstName": "Yuvraj",
                "middleName": "Yograj",
                "lastName": "Singh",
                "fullName": "Yuvraj Singh"
            },
            "marriedName": {
                "prefix": "MR",
                "firstName": "Yuvraj",
                "middleName": "Yograj",
                "lastName": "Singh",
                "fullName": "Yuvraj Singh"
            },
            "preferredName": {
                "prefix": "MR",
                "firstName": "Yuvraj",
                "middleName": "Yograj",
                "lastName": "Singh",
                "fullName": "Yuvraj Singh"
            },
            "priorName": {
                "prefix": "MR",
                "firstName": "Yuvraj",
                "middleName": "Yograj",
                "lastName": "Singh",
                "fullName": "Yuvraj Singh"
            },
            "legalName": {
                "prefix": "MR",
                "firstName": "Yuvraj",
                "middleName": "Yograj",
                "lastName": "Singh",
                "fullName": "Yuvraj Singh"
            },
            "shortName": "Yuvi",
            "nameAsPerDocuments": [
                {
                    "documentType": "AADHAAR",
                    "name": {
                        "prefix": "MR",
                        "firstName": "Yuvraj",
                        "lastName": "Singh",
                        "fullName": "Yuvraj Singh"
                    }
                },
                {
                    "documentType": "PAN",
                    "name": {
                        "prefix": "MR",
                        "firstName": "Yuvraj",
                        "lastName": "Singh",
                        "fullName": "Yuvraj Singh"
                    }
                }
            ]
        },
        "familyName": {
            "fatherName": {
                "prefix": "MR",
                "firstName": "Yograj",
                "middleName": "SrYograj",
                "lastName": "Singh"
            },
            "motherName": {
                "prefix": "MRS",
                "firstName": "Shabnam",
                "middleName": "Yograj",
                "lastName": "Singh"
            },
            "spouseName": {
                "prefix": "MRS",
                "firstName": "Hazel",
                "middleName": "Yograj",
                "lastName": "Keech"
            },
            "motherMaidenName": {
                "fullName": "Shabnam Singh"
            }
        },
        "customerSince": "01-01-2020",
        "gender": "MALE",
        "religion": "HINDU",
        "ethnicity": "ASIAN",
        "reservationCategory": "GENERAL",
        "physicalStatus": "NA",
        "immigrationStatus": "CITIZEN",
        "maritalStatus": "MARRIED",
        "residentialStatus": "RESIDENT_INDIVIDUAL",
        "birthInformation": {
            "dateOfBirth": "12-12-1981",
            "cityOfBirth": "Chandigarh",
            "countryOfBirth": "INDIA"
        },
        "militaryRank": "Brigadier",
        "headOfHousehold": false,
        "dependents": [
            {
                "name": {
                    "prefix": "MR",
                    "firstName": "Yograj",
                    "lastName": "Singh"
                },
                "dateOfBirth": "01-01-1956",
                "relationship": "FATHER"
            },
            {
                "name": {
                    "prefix": "MRS",
                    "firstName": "Shabnam",
                    "lastName": "Singh"
                },
                "dateOfBirth": "01-01-1958",
                "relationship": "MOTHER"
            }
        ],
        "guardians": [
            {
                "type": "FATHER",
                "partyId": "1000000000",
                "name": {
                    "prefix": "MR",
                    "firstName": "Yograj",
                    "lastName": "Singh"
                }
            }
        ],
        "identificationMark": "Tattoo on right hand",
        "countryOfWorkplace": "INDIA",
        "nationality": "INDIA",
        "citizenships": [
            "INDIA"
        ],
        "residenceCountries": [
            "INDIA"
        ],
        "customerSegment": "IMPERIA",
        "profitabilityBand": "BAND1",
        "politicalExposure": "POLITICALLY_EXPOSED_PERSON",
        "ageStatus": "MAJOR",
        "profitabilityNumber": 5
    }}

    const SubmitData = () => {
    try{
      const res = axios.post("http://localhost:9090/party-write/party-primary-information", party, {headers : headers})
    console.log("Response while making a post call" , res);
    alert("Data has been send successfully");

    }
    catch(error)
    {
      console.log("Error in sending API Data", error)
    }
    

  }
  const headers = {
    "user_name" : "party_async"
  }

    

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
    import("productapp/productData").then((module) => {
      const productData = module.default;
      productData.subscribe({
        next: (val) => {
          console.log(`product data received is`, val);
          loadBooking(val);
        },
      });
    });
  }, []);




  return (
    <div className="seat-selection-container">
      <AppBar sx={{height: '10%'}}>
        <Typography sx={{margin : 2, fontSize: 22}}>FYNDNA</Typography>
      </AppBar>
      <div className="column full-width p-1">
        

        <Stack flexDirection={'col'} spacing={1}>
        <Card sx={{borderRadius : 3}}>
          <Typography sx={{margin : 2}}>Hello Customer, Please follow bellow instructions for submitting Party Primary Information</Typography>
        </Card>
        <Accordion sx={{borderRadius : 3}}>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography>Personal Details</Typography>
            <ExpandMoreIcon />
          </AccordionSummary>
          <AccordionDetails sx={{}}>
            <Stack>
            <TextField
              margin="normal"
              sx={{ margin: '1%'}}
              required
              id="partyID"
              label="Party Id"
              name="PartyId"
              autoComplete="partyId"
              autoFocus
              onChange={(e) => setPartyId(e.target.value)}
            />
            <TextField
              margin="normal"
              sx={{ margin: '1%'}}
              required
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="Firstname"
              autoFocus
              onChange={(e) => setFirst_name(e.target.value)}
            />
            <TextField
              margin="normal"
              sx={{ margin: '1%'}}
              required
              id="middleName"
              label="Middle Name"
              name="middleName"
              autoComplete="Middlename"
              autoFocus
              onChange={(e) => setMiddle_name(e.target.value)}
            />
            <TextField
              margin="normal"
              sx = {{margin: '1%'}}
              required
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="Lastname"
              autoFocus
              onChange={(e) => setLast_name(e.target.value)}
            />
            
            

              
              <TextField
                id="outlined-basic"
                label="Ethinicity"
                variant="outlined"
                sx={{ margin: 1 }}
              />
              <TextField
                id="outlined-basic"
                label="Religion"
                variant="outlined"
                sx={{ margin: 1 }}
              />
              <InputLabel sx={{marginLeft : 2}} id="demo-simple-select-label">Gender</InputLabel>
              <Select variant="standard" sx={{width : '30%', marginLeft : 2}}>
                <MenuItem>Male</MenuItem>
                <MenuItem>Female</MenuItem>
                <MenuItem>Others</MenuItem>
              </Select>
              <TextField
                id="outlined-basic"
                label="Age Group"
                variant="outlined"
                sx={{ margin: 1 }}
              />
            </Stack>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{borderRadius : 3}}>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography>Family Details</Typography>
            <ExpandMoreIcon />
          </AccordionSummary>
          <AccordionDetails>
            <Stack>
              <TextField
                id="outlined-basic"
                label="Father Name"
                variant="outlined"
                sx={{ margin: 1 }}
              />
              <TextField
                id="outlined-basic"
                label="Mother Name"
                variant="outlined"
                sx={{ margin: 1 }}
              />
              <InputLabel sx={{marginLeft : 2}} id="demo-simple-select-label">
                Marital Status
              </InputLabel>
              <Select variant="standard" sx={{marginLeft : 2, width : '30%'}}>
                <MenuItem>Married</MenuItem>
                <MenuItem>Un-Married</MenuItem>
                <MenuItem>Divorced</MenuItem>
              </Select>
              <TextField
                id="outlined-basic"
                label="Spouse Name"
                variant="outlined"
                sx={{ margin: 1 }}
              />

              <TextField
                id="outlined-basic"
                label="Mother Maiden Name"
                variant="outlined"
                sx={{ margin: 1 }}
              />
            </Stack>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{borderRadius : 3}}>
          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
            <Typography>General Information</Typography>
            <ExpandMoreIcon />
          </AccordionSummary>
          <AccordionDetails>
            <Stack>
              <TextField
                id="outlined-basic"
                label="Customer Since"
                variant="outlined"
                sx={{ margin: 1 }}
              />
              <TextField
                id="outlined-basic"
                label="Religion"
                variant="outlined"
                sx={{ margin: 1 }}
              />
              <TextField
                id="outlined-basic"
                label="Reservation Category"
                variant="outlined"
                sx={{ margin: 1 }}
              />
              <TextField
                id="outlined-basic"
                label="Residential Status"
                variant="outlined"
                sx={{ margin: 1 }}
              />

              <TextField
                id="outlined-basic"
                label="Physical Status"
                variant="outlined"
                sx={{ margin: 1 }}
              />

              <TextField
                id="outlined-basic"
                label="Immigration Status"
                variant="outlined"
                sx={{ margin: 1 }}
              />
              <TextField
                id="outlined-basic"
                label="Marital Status"
                variant="outlined"
                sx={{ margin: 1 }}
              />
              <TextField
                id="outlined-basic"
                label="Political Exposure"
                variant="outlined"
                sx={{ margin: 1 }}
              />
              <Button sx={{width: '10%'}} variant="contained" onClick={SubmitData}>Submit</Button>
            </Stack>
          </AccordionDetails>
        </Accordion>
        
        </Stack>
      </div>
    </div>
  );
};

export default EnterDetailsContent;
