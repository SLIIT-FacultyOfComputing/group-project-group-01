import React, { useState } from 'react';
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';

export default function AddMaterials() {
  let navigate = useNavigate();
  const [material, setMaterials] = useState({
    name: "",
    quantity: "",
    description: ""
  });

  const { name, quantity, description } = material;

  const onInputChange = (e) => {
    setMaterials({
      ...material,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/v3/material/add", {
      ...material,
      quantity: parseInt(material.quantity)  
    });
    navigate("/");
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Register Material</h2>
          <form onSubmit={onSubmit}>
            <div className='mb-3'>
              <label htmlFor='name' className='form-label'>Material Name</label>
              <input
                type='text'
                className='form-control'
                placeholder='Enter Material Name'
                name='name'
                value={name}
                onChange={onInputChange}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='quantity' className='form-label'>Quantity</label>
              <input
                type='number'
                className='form-control'
                placeholder='Enter Material Quantity'
                name='quantity'
                value={quantity}
                onChange={onInputChange}
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='description' className='form-label'>Material Description</label>
              <input
                type='text'
                className='form-control'
                placeholder='Enter Material Description'
                name='description'
                value={description}
                onChange={onInputChange}
              />
            </div>

            <button type='submit' className='btn btn-outline-primary'>Submit</button>
            <Link className='btn btn-outline-danger mx-2' to ="/">Cancel</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
