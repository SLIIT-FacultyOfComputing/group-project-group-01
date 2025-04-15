import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SaveInv() {

  let navigate= useNavigate();
  
  const [Inv,setInv] = useState({
    material:"",
    used_stock:""
  })

  const{material,used_stock}=Inv
  const onInputChange=(event)=>{

    setInv({...Inv, [event.target.name]: event.target.value});
  };

  const onSubmit=async (event)=>{
    event.preventDefault();
    await axios.post("http://localhost:8080/api/v2/saveInv",Inv);
    navigate("/Inv");
  };

  return (
    <div className="container">
      <div className="row">
        
        <div className ="col-md-6 offset-md-3  rounded p-4 mt-2 shadow"
          style={{background: "radial-gradient(ellipse,rgb(237, 241, 214), rgb(157, 192, 139))"}}>
          
          <h2 className="text-center m-4"
          style={{color:"rgb(59, 97, 63)"}}>
          Add Allocated Material</h2>

          <form onSubmit={(event) => onSubmit(event)}>
          
          <div className="mb-3">
            <label htmlFor="material" className="form-label"
            style={{color:"rgb(59, 97, 63)",
            marginLeft:"-340px",
            fontWeight:"bold",
            }}>
              Material Name
            </label>
            <input 
            type={"text"}
            className="form-control"
            placeholder="Enter material name"
            name="material"
            value={material}
            onChange={(event)=>onInputChange(event)}
            ></input>
          </div>

          <div className="mb-3">
            <label htmlFor="used_stock" className="form-label"
            style={{color:"rgb(59, 97, 63)",
            marginLeft:"-410px",
            fontWeight:"bold",}}>
              Stock
            </label>
            <input 
            type={"text"}
            className="form-control"
            placeholder="Stock amount "
            name="used_stock"
            value={used_stock}
            onChange={(event)=>onInputChange(event)}
            ></input>
          </div>

          <button type="submit" className="btn btn-outline-success">Submit</button>
          <Link className="btn btn-outline-danger mx-2" to="/">
          Cancel</Link>
          </form>
        </div>
      </div>
    </div>
  )
}
