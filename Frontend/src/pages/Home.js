import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    loadMaterials();
  }, []);

  const loadMaterials = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/v3/material/get");
      setMaterials(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Failed to fetch materials:", error);
    }
  };

  const deleteMaterial = async (id) => {
    try {
      await axios({
        method: 'delete',
        url: 'http://localhost:8080/api/v3/material/delete',
        data: { id }
      });
      loadMaterials();
    } catch (error) {
      console.error("Error deleting material:", error);
    }
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Material Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Description</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((material, index) => (
              <tr key={material.id}>
                <th scope="row">{index + 1}</th>
                <td>{material.name}</td>
                <td>{material.quantity}</td>
                <td>{material.description}</td>
                <td>
                  <Link className="btn btn-primary mx-2" to={`/viewmaterial/${material.id}`}>
                    View
                  </Link>



                  <Link className="btn btn-outline-primary mx-2" to={`/editmaterial/${material.id}`}>
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteMaterial(material.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
