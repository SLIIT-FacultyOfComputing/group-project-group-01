import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

export default function EditEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState({
    name: '',
    nic: '',
    phone: '',
    address: '',
    sex: '',
    role: ''
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/employees/view?id=${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching employee:", error);
        alert("Failed to load employee details.");
      }
    };

    fetchEmployee();
  }, [id]);

  const onInputChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const { name, nic, phone, address, sex, role } = employee;
    if (!name || !nic || !phone || !address || !sex || !role) {
      alert("All fields are required!");
      return;
    }

    const updatedEmployee = {
      name,
      nic,
      phone,
      address,
      sex: sex.toUpperCase(),
      role: role.toUpperCase()
    };

    try {
      await axios.put(`http://localhost:8080/api/employees/update/${id}`, updatedEmployee);
      navigate("/employees");
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Something went wrong while updating the employee.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="col-md-6 offset-md-3 bg-white border rounded p-4 shadow">
        <h4 className="text-center text-success fw-bold mb-4">Edit Employee</h4>
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={employee.name}
              onChange={onInputChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">NIC</label>
            <input
              type="text"
              className="form-control"
              name="nic"
              value={employee.nic}
              onChange={onInputChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={employee.phone}
              onChange={onInputChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={employee.address}
              onChange={onInputChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Sex</label>
            <select
              className="form-control"
              name="sex"
              value={employee.sex}
              onChange={onInputChange}
            >
              <option value="">Select</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              className="form-control"
              name="role"
              value={employee.role}
              onChange={onInputChange}
            >
              <option value="">Select</option>
              <option value="LAB">Lab</option>
              <option value="SALES">Sales</option>
            </select>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-success px-4 me-2">Update</button>
            <Link className="btn btn-outline-secondary px-4" to="/employees">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
