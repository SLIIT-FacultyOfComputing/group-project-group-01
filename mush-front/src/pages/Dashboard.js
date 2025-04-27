import React from 'react';
import Lottie from "lottie-react";
import plantGrow from "../PlantAnimation.json";

export default function BlackGreenBackground(){

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
         </div>

         <div style={{ width: "400px", height: "400px", marginRight: "-100px"}}>
        <Lottie animationData={plantGrow} loop={true} autoplay />
        </div>

    </div>
    )
}