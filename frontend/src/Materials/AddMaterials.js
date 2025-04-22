import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

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
    navigate("/materials");
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="bg-white rounded-4 shadow-lg p-4">
            <h3 className="text-center text-success mb-4 fw-semibold"> Register New Material</h3>
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-medium">Material Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Material Name"
                  name="name"
                  value={name}
                  onChange={onInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="quantity" className="form-label fw-medium">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter Material Quantity"
                  name="quantity"
                  value={quantity}
                  onChange={onInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label fw-medium">Description</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Description"
                  name="description"
                  value={description}
                  onChange={onInputChange}
                  required
                />
              </div>

              <div className="d-flex justify-content-center gap-3 mt-4">
                <button type="submit" className="btn btn-success px-4">
                  Submit
                </button>
                <Link to="/materials" className="btn btn-outline-danger px-4">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
