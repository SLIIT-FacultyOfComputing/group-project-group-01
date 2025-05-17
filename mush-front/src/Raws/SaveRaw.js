import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from "../cssFiles/Save.module.css";

export default function SaveRaw() {

  let navigate= useNavigate();
  
  const [Raw,setRaw] = useState({
    material:"",
    stock:""
  })

  const{material,stock}=Raw
  const onInputChange=(event)=>{

    setRaw({...Raw, [event.target.name]: event.target.value});
  };

  const onSubmit=async (event)=>{
    event.preventDefault();
    await axios.post("http://localhost:8080/api/v1/saveRaw",Raw
    );
    navigate("/Raw");
    
  };

  return (
    <div className={styles.container}>

    <div className="row">
        <div className ={styles.containerOne}>   
          <h2 className={styles.headerOne}>
          Add Purchased Material</h2>

          <form onSubmit={(event) => onSubmit(event)}>
          
          <div className="mb-3">
            <label htmlFor="material" className={styles.formLabel}>
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
            <label htmlFor="stock" className={styles.formLabel2}>
              Stock
            </label>
            <input 
            type={"text"}
            className="form-control"
            placeholder="Stock amount "
            name="stock"
            value={stock}
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
          <li>Enter the purchased material name in the input box.</li>
          <li>Provide the purchased stock amount in numeric format.</li>
          <li>Click "Submit" to save the material details.</li>
          <li>Click "Cancel" to go back without saving.</li>
          <li>Ensure all fields are filled correctly.</li>
        </ul>
        </div>
    </div>
  )
}
