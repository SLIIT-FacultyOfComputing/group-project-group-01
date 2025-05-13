import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from "lottie-react";
import plantGrow from "../PlantAnimation.json";

export default function BlackGreenBackground(){

  const [user, setUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/auth/me', { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error('Not logged in');
        return res.text();
      })
      .then(setUser)
      .catch(() => navigate('/Login'));
  }, [navigate]);

  const logout = async () => {
  await fetch('http://localhost:8080/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  navigate('/Login');
};

    return (
    <div
    style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "120px",
        height: "50vh"
    }}
    >  
        <div>
            <h1
            style={{
                fontSize: "54px",
                fontWeight: 700,
                fontFamily: "Lexend, sans-serif",
                textAlign: "left",
                marginLeft: "-60px",
                color: "rgb(237, 241, 214)" 
            }}
            >Grow Smart Harvest Better <br />
                 With Fungi Flow</h1>

            <p  style={{
                fontFamily: "Lexend, sans-serif",
                textAlign: "left",
                marginLeft: "-60px",
                fontSize: "18px",
                color: " #EDF1D6" }}>

            All-in-one platform for smart mushroom farming. Track materials & manage inventory.<br />
            From cultivation to sales, streamline operations, and boost efficiency effortlessly.</p>

            <div
          style={{
            fontFamily: "Lexend, sans-serif",
            marginTop: "20px",
            marginLeft: "-60px"
          }}
        >
          <h4>Welcome, {user}</h4>
          <button
            onClick={logout}
            className="btn btn-outline-light mt-2"
          >
            Logout
          </button>
        </div>
         </div>

         <div style={{ width: "400px", height: "400px", marginRight: "-100px"}}>
        <Lottie animationData={plantGrow} loop={true} autoplay />
        </div>

    </div>
    )
}