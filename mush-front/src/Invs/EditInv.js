import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styles from '../cssFiles/Edit.module.css'

export default function EditInv() {

  let navigate= useNavigate();

  const {InvId}=useParams();

  const [Inv,setInv] = useState({
    material:"",
    used_stock:"",
    usageType:""
  })

  const{material,used_stock,usageType}=Inv;
  const onInputChange=(event)=>{

    setInv({...Inv, [event.target.name]: event.target.value});
  };

  useEffect(()=>{

    const loadInv =async ()=>{
      const result=await axios.get(`http://localhost:8080/api/v2/getInv/${InvId}`);
      setInv(result.data);
    }

    loadInv(loadInv);
  },[InvId]);

  const onSubmit=async (event)=>{
    event.preventDefault();

    try {
          await axios.put("http://localhost:8080/api/v2/updateInv", Inv);
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
    <div className="container">
      <div className="row">
      <div className ={styles.containerOne}>
          
          <h2 className={styles.headerOne}>
          Edit Allocated Material
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
    </div>
  )
}
