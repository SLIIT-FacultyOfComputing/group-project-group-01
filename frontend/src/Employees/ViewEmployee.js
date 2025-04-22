import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

export default function ViewEmployee() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/employees/view?id=${id}`);
        setEmployee(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching employee:", error);
        setError("Failed to load employee details.");
      }
    };

    fetchEmployee();
  }, [id]);

  if (error) {
    return <div className="alert alert-danger text-center mt-4">{error}</div>;
  }

  if (!employee) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="col-md-6 offset-md-3 bg-white border rounded p-4 shadow">
        <h4 className="text-center text-success fw-bold mb-4">Employee Details</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>Name:</strong> {employee.name}
          </li>
          <li className="list-group-item">
            <strong>NIC:</strong> {employee.nic}
          </li>
          <li className="list-group-item">
            <strong>Phone:</strong> {employee.phone}
          </li>
          <li className="list-group-item">
            <strong>Address:</strong> {employee.address}
          </li>
          <li className="list-group-item">
            <strong>Sex:</strong> {employee.sex}
          </li>
          <li className="list-group-item">
            <strong>Role:</strong> {employee.role}
          </li>
        </ul>
        <div className="text-center mt-4">
          <Link to="/employees" className="btn btn-success px-4">
            Back to Employees List
          </Link>
        </div>
      </div>
    </div>
  );
}
