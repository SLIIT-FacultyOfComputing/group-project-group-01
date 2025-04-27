import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from "../cssFiles/Save.module.css";

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
    <div className={styles.container}>
      <div className="row">
        
        <div className = {styles.containerOne}>
          
          <h2 className={styles.headerOne}>
          Add Supplier Details</h2>

          <form onSubmit={(event) => onSubmit(event)}>
          
          <div className="mb-3">
            <label htmlFor="supplier" className={styles.formLabel}>
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
            <label htmlFor="material" className={styles.formLabel2}>
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
            <label htmlFor="address" className={styles.formLabel3}>
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
            <label htmlFor="phone" className={styles.formLabel4}>
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

          <div className="d-flex justify-content-center gap-1 mt-3">
          <button type="submit" className="btn btn-outline-success">Submit</button>
          <Link className="btn btn-outline-danger mx-1" to="/">
          Cancel</Link>
          </div>
          
          </form>
        </div>
      </div>
       <div className={styles.Div2}>
              <h3>Instructions</h3>
              <ul>
                <li>Fill in the supplier name, material name, address, and phone number.</li>
                <li>Click "Submit" to save the supplier details.</li>
                <li>Click "Cancel" to go back without saving.</li>
                <li>Ensure all fields are filled correctly.</li>
              </ul>
      </div>
    </div>
  )
}
