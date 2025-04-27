import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styles from '../cssFiles/Edit.module.css'

export default function EditRaw() {

  let navigate= useNavigate();

  const {RawId}=useParams();

  const [Raw,setRaw] = useState({
    material:"",
    stock:""
  })

  const{material,stock}=Raw;
  const onInputChange=(event)=>{

    setRaw({...Raw, [event.target.name]: event.target.value});
  };

  useEffect(()=>{

    const loadRaw =async ()=>{
      const result=await axios.get(`http://localhost:8080/api/v1/getRaw/${RawId}`);
      setRaw(result.data);
    }

    loadRaw(loadRaw);
  },[RawId]);

  const onSubmit=async (event)=>{
    event.preventDefault();
    await axios.put("http://localhost:8080/api/v1/updateRaw", Raw);
    navigate("/Raw");
  };


  return (
    <div className="container">
      <div className="row">
      <div className ={styles.containerOne}>   
          <h2 className={styles.headerOne}>
          Edit Purchased Material</h2>

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
    </div>
  )
}
