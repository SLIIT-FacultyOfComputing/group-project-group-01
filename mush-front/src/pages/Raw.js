import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

export default function Raw() {

    const [Raws,setRaws]=useState([])


    useEffect(()=>{
      loadRaws();
    },[]);
        
        const loadRaws=async()=>{
        const result=await axios.get("http://localhost:8080/api/v1/getRaws");
        setRaws(result.data);
      };

      const deleteRaw=async (id)=> {
        await axios.delete(`http://localhost:8080/api/v1/deleteRaw/${id}`);
        loadRaws();
      };

    return (
    <div className='container'>
      <div className="d-flex justify-content-between align-items-center mb-3 top-bar"
      style={{fontSize:"16px",fontWeight:"600",color:"rgb(59, 97, 63)",padding:"10px"}}>
        Purchased Raw Material Table
      </div>
        <div className="table-container">
        <table className="table custom-table table-hover table-striped border shadow ">
  <thead>
    <tr>
      <th scope="col" style={{color:" #354e2d"}}>#</th>
      <th scope="col" style={{color:" #354e2d"}}>Material Name</th>
      <th scope="col" style={{color:" #354e2d"}}>Stock</th>
      <th scope="col" style={{color:" #354e2d"}}>Actions</th>
    </tr>
  </thead>
  <tbody>
    {
      Raws.map((Raws,index)=>(
        <tr>
        <th scope="row" key={index}>{index+1}</th>
        <td>{Raws.material}</td>
        <td>{Raws.stock}</td>
        <td>
          <Link className="btn btn-outline-success btn-sm custom-btn" 
          to={`/EditRaw/${Raws.id}`}>
          Update</Link>
          <button className="btn btn-outline-danger btn-sm custom-btn"
          
          onClick={()=>deleteRaw(Raws.id)}
          >Delete</button>
        </td>
      </tr>
      ))
    }
  
  </tbody>
</table>
        </div>
        </div>
  )
}