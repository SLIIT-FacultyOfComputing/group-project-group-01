import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SaveSupplier() {

  let navigate= useNavigate();
  
  const [Supplier,setSupplier] = useState({
    supplier:"",
    material:"",
    address:"",
    phone:""
  })

  const{supplier,material,address,phone}=Supplier
  const onInputChange=(event)=>{

    setSupplier({...Supplier, [event.target.name]: event.target.value});
  };

  const onSubmit=async (event)=>{
    event.preventDefault();
    await axios.post("http://localhost:8080/api/v3/saveSupplier",Supplier);
    navigate("/Supplier");
  };

  return (
    <div className="container">
      <div className="row">
        
        <div className ="col-md-6 offset-md-3  rounded p-4 mt-2 shadow"
          style={{background: "radial-gradient(ellipse,rgb(237, 241, 214), rgb(157, 192, 139))"}}>
          
          <h2 className="text-center m-4"
          style={{color:"rgb(59, 97, 63)"}}>
          Add Supplier Details</h2>

          <form onSubmit={(event) => onSubmit(event)}>
          
          <div className="mb-3">
            <label htmlFor="supplier" className="form-label"
            style={{color:"rgb(59, 97, 63)",
            marginLeft:"-340px",
            fontWeight:"bold",
            }}>
              Supplier Name
            </label>
            <input 
            type={"text"}
            className="form-control"
            placeholder="Enter supplier name"
            name="supplier"
            value={supplier}
            onChange={(event)=>onInputChange(event)}
            ></input>
          </div>

          <div className="mb-3">
            <label htmlFor="material" className="form-label"
            style={{color:"rgb(59, 97, 63)",
            marginLeft:"-340px",
            fontWeight:"bold",}}>
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
            <label htmlFor="address" className="form-label"
            style={{color:"rgb(59, 97, 63)",
            marginLeft:"-390px",
            fontWeight:"bold",
            }}>
              Address
            </label>
            <input 
            type={"text"}
            className="form-control"
            placeholder="Enter address"
            name="address"
            value={address}
            onChange={(event)=>onInputChange(event)}
            ></input>
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label"
            style={{color:"rgb(59, 97, 63)",
            marginLeft:"-400px",
            fontWeight:"bold",
            }}>
              phone
            </label>
            <input 
            type={"text"}
            className="form-control"
            placeholder="Enter phone number"
            name="phone"
            value={phone}
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
