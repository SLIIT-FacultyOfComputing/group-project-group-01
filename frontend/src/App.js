import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Layout/Navbar';
import Dashboard from './AdminDashboard/Dashboard';
import EmployeeManagement from './Employees/EmployeeManagement'; 
import SalesReport from './Reports/SalesReport'; 
import LabReports from './Reports/LabReports';
import MaterialManagement from './Materials/MaterialManagement';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/admin/dashboard" element={<Dashboard />} />
           <Route exact path="/materials" element={<MaterialManagement />} />
            <Route exact path="/employees" element={<EmployeeManagement />} /> 
            <Route path="/analytics/sales" element={<SalesReport />} />
            <Route path="/analytics/labs" element={<LabReports />} />
          </Routes>
        </div>
        <div className="footer"></div>
      </div>
    </Router>
  );
}

export default App;