import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

export default function Supplier() {

    const [Suppliers,setSuppliers]=useState([])

    useEffect(()=>{
      loadSuppliers();
    },[]);
        
        const loadSuppliers=async()=>{
        const result=await axios.get("http://localhost:8080/api/v3/getSuppliers");
        setSuppliers(result.data);
      };

      const deleteSupplier=async (sid)=> {
        await axios.delete(`http://localhost:8080/api/v3/deleteSupplier/${sid}`);
        loadSuppliers();
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
      <th scope="col" style={{color:" #354e2d"}}>Supplier Name</th>
      <th scope="col" style={{color:" #354e2d"}}>Material Name</th>
      <th scope="col" style={{color:" #354e2d"}}>Address</th>
      <th scope="col" style={{color:" #354e2d"}}>Contact</th>
      <th scope="col" style={{color:" #354e2d"}}>Actions</th>
    </tr>
  </thead>
  <tbody>
    {
      Suppliers.map((Suppliers,index)=>(
        <tr>
        <th scope="row" key={index}>{index+1}</th>
        <td>{Suppliers.supplier}</td>
        <td>{Suppliers.material}</td>
        <td>{Suppliers.address}</td>
        <td>{Suppliers.phone}</td>
        <td>
          <Link className="btn btn-outline-success mx-2" 
          to={`/EditSupplier/${Suppliers.sid}`}>
          Update</Link>
          <button className="btn btn-danger mx-2"
          
          onClick={()=>deleteSupplier(Suppliers.sid)}
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