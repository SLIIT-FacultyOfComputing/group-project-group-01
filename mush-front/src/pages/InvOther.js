import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

export default function Inv() {

    const [Invs,setInvs]=useState([])
    
    useEffect(()=>{
      loadInvs();
    },[]);
        
        const loadInvs=async()=>{
        const result=await axios.get("http://localhost:8080/api/v2/getInvByUsage/other");
        setInvs(result.data);
      };

      const deleteInv=async (nid)=> {
        await axios.delete(`http://localhost:8080/api/v2/deleteInv/${nid}`);
        loadInvs();
      };

    return (
    <div className='container'>

      <Link to="/InvLab" className="btn mx-2" style={{marginLeft:"-100px"}}>Lab</Link>
      <Link to="/InvSales" className="btn mx-2" style={{marginLeft:"-100px"}}>Sales</Link>
      <Link to="/InvOther" className="btn mx-2" style={{marginLeft:"-100px"}}>Other</Link>

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
      Invs.map((Invs,index)=>(
        <tr>
        <th scope="row" key={index}>{index+1}</th>
        <td>{Invs.material}</td>
        <td>{Invs.used_stock}</td>
        <td>
          <Link className="btn btn-outline-success mx-2" 
          to={`/EditInv/${Invs.nid}`}>
          Update</Link>
          <button className="btn btn-danger mx-2"
          
          onClick={()=>deleteInv(Invs.nid)}
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