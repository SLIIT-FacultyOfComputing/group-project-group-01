import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function EditInv() {

  let navigate= useNavigate();

  const {InvId}=useParams();

  const [Inv,setInv] = useState({
    material:"",
    used_stock:""
  })

  const{material,used_stock}=Inv;
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
    await axios.put("http://localhost:8080/api/v2/updateInv", Inv);
    navigate("/Inv");
  };


  return (
    <div className="container">
      <div className="row">
        <div className ="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Inv Material</h2>
          <form onSubmit={(event) => onSubmit(event)}>
          <div className="mb-3">
            <label htmlFor="material" className="form-label">
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
            <label htmlFor="used_stock" className="form-label">
              Stock
            </label>
            <input 
            type={"text"}
            className="form-control"
            placeholder="Stock amount"
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
