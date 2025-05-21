import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import DownBut from '../layout/DownBut';

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
          <Link className="btn btn-outline-success mx-2" 
          to={`/EditRaw/${Raws.id}`}>
          Update</Link>
          <button className="btn btn-danger mx-2"
          
          onClick={()=>deleteRaw(Raws.id)}
          >Delete</button>
        </td>
      </tr>
      ))
    }
  
  </tbody>
</table>
<DownBut/>
        </div>
        </div>
  )
}