import React, {useEffect, useState} from 'react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

export default function MotionHeading({ text = "Fungi Flow" }) {

    const navigate = useNavigate();
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setFadeOut(true); 
        setTimeout(() => {
          navigate('/Dashboard'); 
        }, 700);  
      }, 1500);
  
      return () => clearTimeout(timer);
    }, [navigate]);

  const letters = text.split("");

  return (

    <motion.div
    initial={{ opacity: 1 }}
    animate={{ opacity: fadeOut ? 0 : 1 }} 
    transition={{ duration: 0.5 }} 
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <h1
    style={{
    display: "flex",
    gap: "0.1em",
    fontSize: "150px", 
    fontWeight: 800, 
    fontFamily: "Lexend,sans serif", 
    color: "rgb(237, 241, 214)", 
    textAlign: "center",
    marginTop: "60px",}}
    >
      {letters.map((char, index) => (
        <motion.span
          key={index}
          initial={{ y: 50, opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1, x: 20 }}
          transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
          style={{ display: "inline-block" }}
        >
          {char}
        </motion.span>
      ))}
    </h1>
    </motion.div>
  );
}
