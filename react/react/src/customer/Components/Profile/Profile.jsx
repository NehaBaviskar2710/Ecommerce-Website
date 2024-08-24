import React from "react";
import { AccountInfo } from "./AccountInfo";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../Redux/Auth/Action";
import { useEffect } from "react";
import { useState } from "react";
import { Faq } from "./Faq";
import "./profile.css";

function Profile() {

  const navigate = useNavigate();
  const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  var today = new Date();
var time = today.getHours();
var greet;


if (time > 0 && time <= 12) {
  greet = 'Good Morning!';
} else if (time > 12 && time <= 18) {
  greet = 'Good Afternoon!';
} else if (time > 18 && time <= 24) {
  greet = 'Good evening!';
} else {
  greet = '';
}


  useEffect(()=>{
    if(jwt){
      dispatch(getUser(jwt))
    }
  
  },[jwt])

  console.log("Profile :",auth.user);
  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>Hello, {greet}</h1>
        <h1>{auth?.user?.firstName} {auth?.user?.lastName}</h1>
      </div>
      <div className="profile-content">
        <div className="profile-picture">
          <img
            src="https://previews.123rf.com/images/neyro2008/neyro20081408/neyro2008140800032/30392929-set-of-user-avatar-icons-in-flat-style.jpg"
            alt="Profile"
          />
        </div>
        <div className="input-box">
          <div className="name-box" style={{ display: "flex" }}>
            <input type="text" placeholder="First name" value={auth?.user?.firstName} disabled/>
            <input type="text" placeholder="Last name" value={auth?.user?.lastName} disabled />
          </div>
          <input
            style={{ marginTop: "10px" }}
            type="email"
            placeholder="Enter your email"
            value={auth?.user?.email} disabled
          />
          {/* <input type="text" placeholder="Enter your Mobile" value={auth.user.mobile} disabled /> */}
        </div>
      </div>
      <div>
        <AccountInfo />
      </div>
      <div>
        <Faq />
      </div>
    </div>
  );
}

export default Profile;