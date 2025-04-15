import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ViewMaterials() {
  const { id } = useParams(); 
  const [material, setMaterial] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        console.log("Fetching material with ID:", id);
        const response = await fetch(`http://localhost:8080/api/v3/material/view?id=${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Material fetched:", data);
        setMaterial(data);
      } catch (err) {
        console.error("Error fetching material:", err);
        setError(err.message);
      }
    };
    fetchMaterial();
  }, [id]);
  

  if (error) return <div>Error: {error}</div>;
  if (!material) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Material Detail</h2>
          <div className="card">
            <div className="card-header">
              Details of Material id: {material.id}
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <b>Material Name:</b> {material.name}
              </li>
              <li className="list-group-item">
                <b>Quantity:</b> {material.quantity}
              </li>
              <li className="list-group-item">
                <b>Description:</b> {material.description}
              </li>
            </ul>
          </div>
          <Link className="btn btn-primary my-2" to={"/"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
