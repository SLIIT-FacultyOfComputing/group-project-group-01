import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Layout/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddMaterials from './Materials/AddMaterials';
import EditMaterials from './Materials/EditMaterials';
import ViewMaterials from './Materials/ViewMaterials';
import Dashboard from './AdminDashboard/Dashboard';
import Home from './Pages/Home';
import EmployeeHome from './Employees/Home';
import AddEmployee from './Employees/AddEmployee';
import EditEmployee from './Employees/EditEmployee';
import ViewEmployee from './Employees/ViewEmployee';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SalesReport from './Reports/SalesReport'; 


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/admin/dashboard" element={<Dashboard />} />
          <Route exact path="/materials" element={<Home />} />
          <Route exact path="/addmaterial" element={<AddMaterials />} />
          <Route exact path="/editmaterial/:id" element={<EditMaterials />} />
          <Route path="/viewmaterial/:id" element={<ViewMaterials />} />
          <Route exact path="/employees" element={<EmployeeHome />} />
          <Route exact path="/addemployee" element={<AddEmployee />} />
          <Route exact path="/editemployee/:id" element={<EditEmployee />} />
          <Route exact path="/viewemployee/:id" element={<ViewEmployee />} />
          <Route path="/analytics/sales" element={<SalesReport />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
