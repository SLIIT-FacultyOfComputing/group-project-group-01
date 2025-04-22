import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function EmployeeHome() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/employees/get");
      setEmployees(result.data);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
      setError("Failed to load employees.");
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/employees/delete/${id}`);
      loadEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
      setError("Failed to delete employee.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-center text-success fw-bold mb-4"> Employee List</h3>

        {error && <div className="alert alert-danger text-center">{error}</div>}

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle text-center">
            <thead className="table-success">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>NIC</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Sex</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-muted">No employees found</td>
                </tr>
              ) : (
                employees.map((emp, index) => (
                  <tr key={emp.id}>
                    <td>{index + 1}</td>
                    <td>{emp.name}</td>
                    <td>{emp.nic}</td>
                    <td>{emp.phone}</td>
                    <td>{emp.address}</td>
                    <td>{emp.sex}</td>
                    <td>{emp.role}</td>
                    <td>
                      <div className="d-flex justify-content-center gap-2 flex-wrap">
                        <Link className="btn btn-sm btn-success" to={`/viewemployee/${emp.id}`}>
                          View
                        </Link>
                        <Link className="btn btn-sm btn-outline-success" to={`/editemployee/${emp.id}`}>
                          Edit
                        </Link>
                        <button className="btn btn-sm btn-danger" onClick={() => deleteEmployee(emp.id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
