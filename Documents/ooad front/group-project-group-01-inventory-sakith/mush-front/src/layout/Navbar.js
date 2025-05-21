import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();
  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const profileRef = useRef(null);

  // Close dropdowns if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile nav and dropdowns on route change
  useEffect(() => {
    setMobileNavOpen(false);
    setAnalyticsOpen(false);
    setProfileOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Home', icon: 'bi-house' },
    { to: '/Supplier', label: 'Suppliers', icon: 'bi-people' },
    { to: '/inventory', label: 'Inventory', icon: 'bi-box-seam' },
    { to: '/Raw', label: 'Material', icon: 'bi-basket' },
  ];

  return (
    <>
      <aside className={`sidebar${mobileNavOpen ? ' open' : ''}`}>
        {/* Brand Section */}
        <div className="brand-section d-flex align-items-center justify-content-between">
          <Link to="/" className="navbar-brand main-brand">
            Fungi Flow
            <div className="sub-brand">Inventory Manager</div>
          </Link>
          <button
            className="btn btn-link d-lg-none"
            style={{ color: '#fff', fontSize: '1.5rem' }}
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            aria-label="Toggle navigation"
          >
            <i className="bi bi-list"></i>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="nav-links">
          {navLinks.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              className={`nav-link-custom d-flex align-items-center${location.pathname === to ? ' active' : ''}`}
            >
              <i className={`bi ${icon}`}></i> {label}
            </Link>
          ))}

          {/* Analytics Dropdown */}
          <Dropdown 
            show={analyticsOpen}
            onToggle={(isOpen) => setAnalyticsOpen(isOpen)}
            className="nav-item"
          >
            <Dropdown.Toggle
              as="a"
              className="nav-link-custom d-flex align-items-center w-100"
              style={{ background: 'none', border: 'none', color: '#fff', fontWeight: 500, fontSize: '1rem' }}
            >
              <i className="bi bi-graph-up me-2"></i>
              Analytics
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu-custom">
              <Dropdown.Item 
                as={Link} 
                to="/Raw" 
                className="dropdown-item-custom"
                onClick={() => setAnalyticsOpen(false)}
              >
                <i className="bi bi-bag me-2"></i> Purchased Raws
              </Dropdown.Item>
              <Dropdown.Item 
                as={Link} 
                to="/inventory" 
                className="dropdown-item-custom"
                onClick={() => setAnalyticsOpen(false)}
              >
                <i className="bi bi-box me-2"></i> All Inventory
              </Dropdown.Item>
              <Dropdown.Item 
                as={Link} 
                to="/inventory/lab" 
                className="dropdown-item-custom"
                onClick={() => setAnalyticsOpen(false)}
              >
                <i className="bi bi-flask me-2"></i> Lab Inventory
              </Dropdown.Item>
              <Dropdown.Item 
                as={Link} 
                to="/inventory/sales" 
                className="dropdown-item-custom"
                onClick={() => setAnalyticsOpen(false)}
              >
                <i className="bi bi-cart me-2"></i> Sales Inventory
              </Dropdown.Item>
              <Dropdown.Item 
                as={Link} 
                to="/inventory/other" 
                className="dropdown-item-custom"
                onClick={() => setAnalyticsOpen(false)}
              >
                <i className="bi bi-archive me-2"></i> Other Inventory
              </Dropdown.Item>
              <Dropdown.Item 
                as={Link} 
                to="/Stock" 
                className="dropdown-item-custom"
                onClick={() => setAnalyticsOpen(false)}
              >
                <i className="bi bi-pie-chart me-2"></i> Stock Analytics
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* User Profile Dropdown */}
        <footer className="sidebar-footer">
          <div className="user-profile-menu" ref={profileRef}>
            <div
              className="user-menu-toggle d-flex align-items-center"
              tabIndex={0}
              role="button"
              aria-haspopup="true"
              aria-expanded={profileOpen}
              onClick={() => setProfileOpen(open => !open)}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') setProfileOpen(open => !open);
                if (e.key === 'Escape') setProfileOpen(false);
              }}
            >
              <div className="user-avatar" aria-label="User avatar">
                <i className="bi bi-person-fill text-success"></i>
              </div>
              <div className="ms-2 d-none d-md-block text-start">
                <span className="user-name d-block fw-medium">Inventory Manager</span>
                <span className="user-role d-block sub-brand">Staff</span>
              </div>
              <i className={`bi bi-chevron-down ms-2${profileOpen ? ' rotate-180' : ''}`}></i>
            </div>
            {profileOpen && (
              <div className="user-dropdown dropdown-menu-custom shadow-lg border-0 py-2 show">
                <div className="user-header user-header-info text-center py-2 border-bottom">
                  <h6 className="mb-0">Inventory Manager</h6>
                  <small>john.doe@fungiflow.com</small>
                </div>
                <Link to="/profile" className="user-menu-item" tabIndex={0}>
                  <i className="bi bi-person me-2"></i> My Profile
                </Link>
                <Link to="/settings" className="user-menu-item" tabIndex={0}>
                  <i className="bi bi-gear me-2"></i> Settings
                </Link>
                <Link to="/help" className="user-menu-item" tabIndex={0}>
                  <i className="bi bi-question-circle me-2"></i> Help Center
                </Link>
                <div className="divider"></div>
                <Link to="/logout" className="user-menu-item text-danger" tabIndex={0}>
                  <i className="bi bi-box-arrow-right me-2"></i> Sign Out
                </Link>
              </div>
            )}
          </div>
        </footer>
      </aside>

      {/* Spacer to prevent content under sidebar */}
      <div className="sidebar-spacer"></div>

      {/* Mobile Hamburger Toggle */}
      <button
        className={`navbar-toggler border-0 d-lg-none${mobileNavOpen ? ' open' : ''}`}
        type="button"
        onClick={() => setMobileNavOpen(open => !open)}
        aria-controls="sidebar"
        aria-expanded={mobileNavOpen}
        aria-label="Toggle navigation"
        style={{
          position: 'fixed',
          top: 18,
          left: 18,
          zIndex: 1100,
          background: 'rgba(27,156,133,0.9)',
          borderRadius: '50%',
          width: 44,
          height: 44,
          boxShadow: '0 2px 8px rgba(0,0,0,0.18)'
        }}
      >
        <div className="hamburger-icon" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
    </>
  );
}
