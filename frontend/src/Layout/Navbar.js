import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import './Navbar.css'; // Keep the same CSS file for now

export default function Navbar() {
  const location = useLocation();

  const isMaterialPage = location.pathname === "/materials";
  const isEmployeePage = location.pathname === "/employees";
  const isDashboardPage = location.pathname === "/admin/dashboard";
  const isSalesReportPage = location.pathname === "/analytics/sales";

  const [currentTime, setCurrentTime] = useState(new Date());
  const [showUserMenu, setShowUserMenu] = useState(false);

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
    hour12: true
  });

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <>
      <div className="sidebar fixed-left d-flex flex-column">
        <div className="brand-section p-3">
          <Link to="/" className="navbar-brand d-block text-decoration-none">
            <div className="brand-text-wrapper">
              <span className="main-brand d-block">Fungi Flow</span>
              <span className="sub-brand">Admin and Management</span>
            </div>
          </Link>
        </div>

        <div className="nav-links flex-grow-1 p-3">
          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <Link 
                className={`nav-link py-2 px-3 nav-link-custom ${isDashboardPage ? 'active' : ''}`} 
                to="/admin/dashboard"
              >
                <i className="fas fa-tachometer-alt me-2"></i> Dashboard
              </Link>
            </li>
            
            <li className="nav-item mb-2">
              <Link 
                className={`nav-link py-2 px-3 nav-link-custom ${isMaterialPage ? 'active' : ''}`} 
                to="/materials"
              >
                <i className="fas fa-boxes me-2"></i> Materials
              </Link>
            </li>

            <li className="nav-item mb-2">
              <Link 
                className={`nav-link py-2 px-3 nav-link-custom ${isEmployeePage ? 'active' : ''}`} 
                to="/employees"
              >
                <i className="fas fa-users me-2"></i> Employees
              </Link>
            </li>

            <Dropdown as="li" className="nav-item mb-2">
  <Dropdown.Toggle
    as="a"
    className={`nav-link py-2 px-3 nav-link-custom ${isSalesReportPage ? 'active' : ''}`}
  >
    <i className="fas fa-chart-bar me-2"></i> Analytics
  </Dropdown.Toggle>

  <Dropdown.Menu className="dropdown-menu-custom">
    <Dropdown.Item as={Link} to="/analytics/sales" className="dropdown-item-custom">
      <i className="fas fa-chart-line me-2"></i> Sales Reports
    </Dropdown.Item>
    <Dropdown.Item as={Link} to="/analytics/labs" className="dropdown-item-custom">
      <i className="fas fa-flask me-2"></i> Lab Reports
    </Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
          </ul>
        </div>

        <div className="sidebar-footer p-3">
          {(isMaterialPage || isEmployeePage) && (
            <div className="action-buttons mb-3">
              {isMaterialPage && (
                <Link className="btn btn-action w-100 py-2 add-button" to="/addmaterial">
                  <i className="fas fa-plus-circle me-2"></i> Add Material
                </Link>
              )}
              {isEmployeePage && (
                <Link className="btn btn-action w-100 py-2 add-button" to="/addemployee">
                  <i className="fas fa-user-plus me-2"></i> Add Employee
                </Link>
              )}
            </div>
          )}

          <div className="time-display mb-3 p-2 text-center">
            <div className="date-part">{formattedDate}</div>
            <div className="time-part">{formattedTime}</div>
          </div>

          <div className="user-profile-menu position-relative">
            <button onClick={toggleUserMenu} className="user-menu-toggle w-100 p-2">
              <div className="user-avatar">
                <span>AD</span>
              </div>
            </button>
            
            {showUserMenu && (
              <div className="user-dropdown shadow-lg">
                <div className="user-header p-3">
                  <div className="user-header-info">
                    <h6 className="mb-0">Admin User</h6>
                    <small className="text-muted">System Administrator</small>
                  </div>
                </div>
                <Link to="/profile" className="user-menu-item">
                  <i className="fas fa-user me-2"></i> My Profile
                </Link>
                <Link to="/settings" className="user-menu-item">
                  <i className="fas fa-cog me-2"></i> Settings
                </Link>
                <div className="divider"></div>
                <Link to="/logout" className="user-menu-item text-danger">
                  <i className="fas fa-sign-out-alt me-2"></i> Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="sidebar-spacer"></div>
    </>
  );
}