import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../cssFiles/Save.module.css';

export default function SaveInv() {

  let navigate= useNavigate();
  
  const [Inv,setInv] = useState({
    material:"",
    used_stock:"",
    usageType:""
  })

  const{material,used_stock,usageType}=Inv

  const onInputChange=(event)=>{

    setInv({...Inv, [event.target.name]: event.target.value});
  };

  const onSubmit=async (event)=>{
    event.preventDefault();
    
    try {
      await axios.post('http://localhost:8080/api/v2/saveInv', Inv);
      navigate('/Inv');
    } 
    catch (error) {
      const backendMessage = error?.response?.data?.message;
      
      if (backendMessage && backendMessage.includes("enough")) {
        alert(`⚠️ Warning: ${backendMessage}, Please check the stock amount.`);
      } else {
        alert(" Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className={styles.container}>

      <div className="row">
        <div className ={styles.containerOne}>
          
          <h2 className={styles.headerOne}>
          Add Allocated Material
          </h2>

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

          <div className="selection mb-3">
          <label htmlFor="usageType" className={styles.formLabel2}>
            Usage Type
          </label>
          <select
            className="form-control"
            name="usageType"
            value={usageType}
            onChange={(event) => onInputChange(event)}
          >
            <option value="">Select usage type</option>
            <option value="sales">Sales</option>
            <option value="lab">Lab</option>
            <option value="other">Other</option>
          </select>
          </div>

          <div className="mb-3">
            <label htmlFor="used_stock" className={styles.formLabel3}>
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
          <li>Enter the allocated material name in the input box.</li>
          <li>Select the usage type from the dropdown menu.</li>
          <li>Provide the allocated stock amount in numeric format.</li>
          <li>Click "Submit" to save the material details.</li>
          <li>Click "Cancel" to go back without saving.</li>
          <li>Ensure all fields are filled correctly.</li>
        </ul>
        </div>
    </div>
  )
}
