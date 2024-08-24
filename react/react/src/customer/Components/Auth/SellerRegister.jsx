
import { Grid, TextField, Button, Box, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, register } from "../../../Redux/Auth/Action";
import { Fragment, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

export default function SellerRegisterUserForm({ handleNext }) {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [openSnackBar,setOpenSnackBar]=useState(false);
  const { auth } = useSelector((store) => store);
  const handleClose=()=>setOpenSnackBar(false);

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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


  const jwt=localStorage.getItem("jwt");

useEffect(()=>{
  if(jwt){
    dispatch(getUser(jwt))
  }

},[jwt])


  useEffect(() => {
    if (auth.user || auth.error) setOpenSnackBar(true)
  }, [auth.user]);

  const sendAutoReply = (firstName, lastName, email, password) => {
    emailjs
      .send(
        "service_q36ec76",
        "template_2ajhh0b",
        {
          first_Name: firstName,
      lastName: lastName,
      toEmail: email,
      password: password,
        },
        "T345zM7himUgLEskm"
      )
      .then((result) => {
        console.log(result.text);
        if (result.status === 200) {
          console.log("Email sent successfully", result);
        } else {
          console.log("Email sending failed", result);
        }
        
        // Optionally show a success toast or message for the auto-reply
      })
      .catch((error) => {
        console.error(error.text);
        console.log("email sent failed");

        
      });
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const userData={
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      role: "ROLE_ADMIN",
      
    }
    console.log("user data",userData);
    dispatch(register(userData))

    sendAutoReply(data.get("firstName"),data.get("lastName"),data.get("email"),data.get("password"))
  };

  return (
    <div className="">
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
              helperText={firstNameError ? "First name should be at least 3 letters long and contain only alphabets." : ""}
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
    helperText={lastNameError ? "Last name should be at least 3 letters long and contain only alphabets." : ""}
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
              Seller Register
            </Button>
          </Grid>
        </Grid>
      </form>

<div className="flex justify-center flex-col items-center">
     <div className="py-3 flex items-center ">
        <p className="m-0 p-0">if you have already account ?</p>
        <Button onClick={()=> navigate("/login")} className="ml-5" size="small">
          Seller Login
        </Button>
      </div>
</div>

<Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {auth.error?auth.error:auth.user?"Register Success":""}
        </Alert>
      </Snackbar>
     
    </div>
  );
}
