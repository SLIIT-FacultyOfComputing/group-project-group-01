import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
  const [materials, setMaterials] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMaterials();
  }, []);

  const loadMaterials = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/v3/material/get");
      setMaterials(result.data);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch materials:", error);
      setError("Failed to load materials.");
    }
  };

  const deleteMaterial = async (id) => {
    try {
      await axios.delete("http://localhost:8080/api/v3/material/delete", {
        data: { id }
      });
      loadMaterials();
    } catch (error) {
      console.error("Error deleting material:", error);
      setError("Failed to delete material.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="bg-white shadow rounded-3 p-4">
        <h3 className="text-center text-success fw-bold mb-4">Material List</h3>

        {error && (
          <div className="alert alert-danger text-center">{error}</div>
        )}

        {materials.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle text-center">
              <thead className="table-success">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((material, index) => (
                  <tr key={material.id}>
                    <td>{index + 1}</td>
                    <td>{material.name}</td>
                    <td>{material.quantity}</td>
                    <td>{material.description}</td>
                    <td>
                      <div className="d-flex justify-content-center gap-2 flex-wrap">
                        <Link className="btn btn-sm btn-success" to={`/viewmaterial/${material.id}`}>
                          View
                        </Link>
                        <Link className="btn btn-sm btn-outline-success" to={`/editmaterial/${material.id}`}>
                          Edit
                        </Link>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => deleteMaterial(material.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-muted">No materials found.</div>
        )}
      </div>
    </div>
  );
}
