//AddAddress = DeliveryAddressForm

import * as React from "react";
import { Grid, TextField, Button, Box, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../../Redux/Customers/Order/Action";
import userEvent from "@testing-library/user-event";
import AddressCard from "../adreess/AdreessCard";
import { useState } from "react";

export default function AddDeliveryAddressForm({ handleNext }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);
  const [selectedAddress, setSelectedAdress] = useState(null);

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [cityError, setCityError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [cityCodeError, setCityCodeError] = useState(false);
  const [selectedState, setSelectedState] = useState(false);
  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    // Add more states as needed...
  ];

  // console.log("auth", auth);

  const handleSubmit = (event) => {
    event.preventDefault(); //after clicking submit button page didn't refresh
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      streetAddress: data.get("address"),
      city: data.get("city"),
      state: data.get("state"),
      zipCode: data.get("zip"),
      mobile: data.get("phoneNumber"),
    };

    dispatch(createOrder({ address, jwt, navigate }));
    // after perfoming all the opration
    handleNext();
  };

  const handleCreateOrder = (item) => {
    dispatch(createOrder({ address: item, jwt, navigate }));
    handleNext();
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} lg={5}>
        <Box className="border rounded-md shadow-md h-[30.5rem] overflow-y-scroll ">
          {auth.user?.addresses.map((item) => (
            <div
              onClick={() => setSelectedAdress(item)}
              className="p-5 py-7 border-b cursor-pointer"
            >
              {" "}
              {/* Call the AddressCard.jsx */}
              <AddressCard address={item} />
              {selectedAddress?.id === item.id && (
                <Button
                  sx={{ mt: 2 }}
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={() => handleCreateOrder(item)}
                >
                  Delivere Here
                </Button>
              )}
            </div>
          ))}
        </Box>
      </Grid>

      {/* Form */}
      <Grid item xs={12} lg={7}>
        <Box className="border rounded-md shadow-md p-5">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  fullWidth
                  autoComplete="given-name"
                  inputProps={{ pattern: "[A-Za-z]{3,}" }}
                  error={firstNameError}
                  helperText={
                    firstNameError
                      ? "First name should be at least 3 letters long and contain only alphabets."
                      : ""
                  }
                  onBlur={(e) => {
                    if (!e.target.validity.valid) {
                      setFirstNameError(true);
                    } else {
                      setFirstNameError(false);
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  fullWidth
                  autoComplete="given-name"
                  inputProps={{ pattern: "[A-Za-z]{3,}" }}
                  error={lastNameError}
                  helperText={
                    lastNameError
                      ? "Last name should be at least 3 letters long and contain only alphabets."
                      : ""
                  }
                  onBlur={(e) => {
                    if (!e.target.validity.valid) {
                      setLastNameError(true);
                    } else {
                      setLastNameError(false);
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="address"
                  name="address"
                  label="Address"
                  fullWidth
                  autoComplete="shipping address"
                  multiline
                  rows={4}
                  inputProps={{ pattern: "{1,}" }}
                  error={addressError}
                  helperText={addressError ? "Please add Address" : ""}
                  onBlur={(e) => {
                    if (!e.target.validity.valid) {
                      setAddressError(true);
                    } else {
                      setAddressError(false);
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="shipping address-level2"
                  inputProps={{ pattern: "[A-Za-z]{3,}" }}
                  error={cityError}
                  helperText={
                    cityError
                      ? "City should be at least 3 letters long and contain only alphabets."
                      : ""
                  }
                  onBlur={(e) => {
                    if (!e.target.validity.valid) {
                      setCityError(true);
                    } else {
                      setCityError(false);
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="state"
                  name="state"
                  label="State/Province/Region"
                  fullWidth
                  select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  {indianStates.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="zip"
                  name="zip"
                  label="Zip / Postal code"
                  fullWidth
                  autoComplete="shipping postal-code"
                  inputProps={{ pattern: "[0-9]{4,}" }}
                  error={cityCodeError}
                  helperText={
                    cityCodeError
                      ? "City code should be at least 4 digits long and contain only digits."
                      : ""
                  }
                  onBlur={(e) => {
                    if (!e.target.validity.valid) {
                      setCityCodeError(true);
                    } else {
                      setCityCodeError(false);
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  fullWidth
                  autoComplete="tel"
                  inputProps={{ pattern: "[0-9]{10,}" }}
                  error={phoneNumberError}
                  helperText={
                    phoneNumberError
                      ? "Phone number should be 10 digits long and contain only digits."
                      : ""
                  }
                  onBlur={(e) => {
                    if (!e.target.validity.valid) {
                      setPhoneNumberError(true);
                    } else {
                      setPhoneNumberError(false);
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  sx={{ padding: ".9rem 1.5rem" }}
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Deliverd Here
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}
