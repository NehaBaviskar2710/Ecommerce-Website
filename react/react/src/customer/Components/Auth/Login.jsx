import * as React from "react";
import { Grid, TextField, Button, Box, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, login } from "../../../Redux/Auth/Action";
import { useEffect } from "react";
import { useState } from "react";

export default function LoginUserForm({ handleNext }) {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt");
  const [openSnackBar,setOpenSnackBar]=useState(false);
  const { auth } = useSelector((store) => store);
  const handleCloseSnakbar=()=>setOpenSnackBar(false);

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const isPasswordValid = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[@$!%*?&]/.test(password);
    const isLengthValid = password.length >= 8;
  
    return (
      hasUppercase &&
      hasLowercase &&
      hasDigit &&
      hasSpecialChar &&
      isLengthValid
    );
  };
  useEffect(()=>{
    if(jwt){
      dispatch(getUser(jwt))
    }
  
  },[jwt])
  
  
    useEffect(() => {
      if (auth.user || auth.error) setOpenSnackBar(true)
    }, [auth.user]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const userData={
      email: data.get("email"),
      password: data.get("password"),
     
    }
    console.log("login user",userData);
  
    dispatch(login(userData));

  };

  return (
    <React.Fragment className=" shadow-lg ">
      <form className="w-full" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="given-name"
              type="email"
              error={emailError}
    helperText={emailError ? "Enter a valid email address." : ""}
    onBlur={(e) => {
      if (!e.target.validity.valid) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="password"
              name="password"
              label="Password"
              fullWidth
              autoComplete="given-name"
              type="password"
    error={passwordError}
    helperText={
      passwordError
        ? "Password should be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character."
        : ""
    }
    onBlur={(e) => {
      const isValid = isPasswordValid(e.target.value);
      setPasswordError(!isValid);
    }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              className="bg-[#9155FD] w-full"
              type="submit"
              variant="contained"
              size="large"
              sx={{padding:".8rem 0"}}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className="flex justify-center flex-col items-center">
         <div className="py-3 flex items-center">
        <p className="m-0 p-0">don't have account ?</p>
        <Button onClick={()=> navigate("/register")} className="ml-5" size="small">
          Register
        </Button>
        </div>
      </div>
      <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleCloseSnakbar}>
        <Alert onClose={handleCloseSnakbar} severity="success" sx={{ width: '100%' }}>
          {auth.error?auth.error:auth.user?"Register Success":""}
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}
