import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Stock() {

    const [Stocks,setStocks]=useState([])


    useEffect(()=>{
      loadStocks();
    },[]);
        
        const loadStocks=async()=>{
        const result=await axios.get("http://localhost:8080/api/v4/getStocks");
        setStocks(result.data);
      };

    return (
    <div className='container'>
        <div className='py-4'>
        <table 
        className="table border shadow table-bordered"
        style={{
          borderRadius: "8px", 
          overflow: "hidden",
        }}
        >
  <thead>
    <tr>
      <th scope="col" style={{color:" #354e2d"}}>#</th>
      <th scope="col" style={{color:" #354e2d"}}>Material Name</th>
      <th scope="col" style={{color:" #354e2d"}}>Available Stock</th>
    </tr>
  </thead>
  <tbody>
    {
      Stocks.map((Stocks,index)=>(
        <tr>
        <th scope="row" key={index}>{index+1}</th>
        <td>{Stocks.material}</td>
        <td>{Stocks.stock}</td>
      </tr>
      ))
    }
  
  </tbody>
</table>
        </div>
        </div>
  )
}