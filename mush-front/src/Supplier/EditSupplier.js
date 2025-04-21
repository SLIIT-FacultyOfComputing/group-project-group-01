import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function EditSupplier() {

  let navigate= useNavigate();

  const {SupplierId}=useParams();

  const [Supplier,setSupplier] = useState({
    supplier:"",
    material:"",
    address:"",
    phone:""
  })

  const{supplier,material,address,phone}=Supplier;
  const onInputChange=(event)=>{

    setSupplier({...Supplier, [event.target.name]: event.target.value});
  };

  useEffect(()=>{

    const loadSupplier =async ()=>{
      const result=await axios.get(`http://localhost:8080/api/v3/getSupplier/${SupplierId}`);
      setSupplier(result.data);
    }

    loadSupplier(loadSupplier);
  },[SupplierId]);

  const onSubmit=async (event)=>{
    event.preventDefault();
    await axios.put("http://localhost:8080/api/v3/updateSupplier", Supplier);
    navigate("/Supplier");
  };


  return (
    <div className="container">
      <div className="row">
        <div className ="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Supplier</h2>
          <form onSubmit={(event) => onSubmit(event)}>
          <div className="mb-3">
            <label htmlFor="supplier" className="form-label">
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
            <label htmlFor="material" className="form-label">
              material Name
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
            marginLeft:"-340px",
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
            marginLeft:"-340px",
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
