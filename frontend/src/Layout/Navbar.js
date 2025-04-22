import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const isMaterialPage = location.pathname === "/materials";
  const isEmployeePage = location.pathname === "/employees";

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          {/* Brand with stylish font */}
          <Link to="/" className="navbar-brand p-0 m-0 d-flex align-items-center">
            <span style={{
              fontFamily: "'Lobster', cursive",
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginRight: '0.5rem',
              color: 'white'
            }}>
              Fungi Flow
            </span>
            <span style={{
              fontSize: '1.5rem',
              fontWeight: '300',
              opacity: 0.85,
              color: 'white'
            }}>
              - Admin and Management
            </span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end align-items-center" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0 me-3">
              <li className="nav-item">
                <Link className="nav-link" to="/admin/dashboard">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/materials">Material Management</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/employees">Employee Management</Link>
              </li>
            </ul>

            {isMaterialPage && (
              <Link className="btn btn-outline-light mx-2" to="/addmaterial">
                Add Material
              </Link>
            )}
            {isEmployeePage && (
              <Link className="btn btn-outline-light mx-2" to="/addemployee">
                Add Employee
              </Link>
            )}

            <span className="text-light border border-light rounded px-2 py-1 small">
              {formattedDate} - {formattedTime}
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
}
