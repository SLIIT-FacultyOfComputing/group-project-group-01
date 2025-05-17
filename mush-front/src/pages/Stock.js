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
      <div className="d-flex justify-content-between align-items-center mb-3 top-bar"
      style={{fontSize:"16px",fontWeight:"600",color:"rgb(59, 97, 63)",padding:"10px"}}>
        Stock Level Table
      </div>
       <div className="table-container">
        <table className="table custom-table table-hover table-striped border shadow">
          <thead>
            <tr>
              <th scope="col" style={{color:" #354e2d"}}>#</th>
              <th scope="col" style={{color:" #354e2d"}}>Material Name</th>
              <th scope="col" style={{color:" #354e2d"}}>Available Stock</th>
            </tr>
          </thead>
          <tbody>
            {
              Stocks.map((Stock,index)=>(
                <tr key={Stock.tid}>
                  <th scope="row">{index+1}</th>
                  <td>{Stock.material}</td>
                  <td>{Stock.stock}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        </div>
        </div>
  )
}