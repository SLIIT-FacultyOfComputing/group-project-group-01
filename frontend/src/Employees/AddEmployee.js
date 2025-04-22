import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function AddEmployee() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    nic: '',
    phone: '',
    address: '',
    sex: '',
    role: ''
  });

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

    const employeeData = {
      name,
      nic,
      phone,
      address,
      sex: sex.toUpperCase(),
      role: role.toUpperCase()
    };

    try {
      await axios.post("http://localhost:8080/api/employees/add", employeeData);
      navigate("/employees");
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Something went wrong while adding the employee.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="col-md-6 offset-md-3 bg-white border rounded p-4 shadow">
        <h4 className="text-center text-success fw-bold mb-4">Register New Employee</h4>
        <form onSubmit={onSubmit}>
          
          <div className="mb-3">
            <label className="form-label fw-semibold">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={employee.name}
              onChange={onInputChange}
              placeholder="Enter employee name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">NIC</label>
            <input
              type="text"
              className="form-control"
              name="nic"
              value={employee.nic}
              onChange={onInputChange}
              placeholder="Enter NIC number"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Phone</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={employee.phone}
              onChange={onInputChange}
              placeholder="Enter phone number"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={employee.address}
              onChange={onInputChange}
              placeholder="Enter address"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Sex</label>
            <select
              className="form-select"
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
            <label className="form-label fw-semibold">Role</label>
            <select
              className="form-select"
              name="role"
              value={employee.role}
              onChange={onInputChange}
            >
              <option value="">Select</option>
              <option value="LAB">Lab</option>
              <option value="SALES">Sales</option>
            </select>
          </div>

          <div className="d-flex justify-content-center gap-2 mt-4">
            <button type="submit" className="btn btn-success">Submit</button>
            <Link to="/employees" className="btn btn-outline-danger">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
