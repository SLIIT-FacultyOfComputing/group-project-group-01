import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function ViewMaterials() {
  const { id } = useParams();
  const [material, setMaterial] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v3/material/view?id=${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMaterial(data);
      } catch (err) {
        console.error("Error fetching material:", err);
        setError(err.message);
      }
    };
    fetchMaterial();
  }, [id]);

  if (error) return <div className="text-danger text-center mt-4">Error: {error}</div>;
  if (!material) return <div className="text-muted text-center mt-4">Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="bg-white rounded-4 shadow-lg p-4">
            <h3 className="text-center text-primary mb-4 fw-semibold">
              🧾 Material Details
            </h3>
            <div className="card border-0">
              <div className="card-header bg-success text-white fw-semibold">
                Material ID: {material.id}
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Material Name:</strong> {material.name}
                </li>
                <li className="list-group-item">
                  <strong>Quantity:</strong> {material.quantity}
                </li>
                <li className="list-group-item">
                  <strong>Description:</strong> {material.description}
                </li>
              </ul>
            </div>
            <div className="text-center mt-4">
              <Link className="btn btn-success px-4" to="/materials">
                ← Back to Materials
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
