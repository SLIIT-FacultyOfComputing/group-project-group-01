import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';
import Raw from './pages/Raw';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InventoryManagement from './pages/InventoryManagement';
import Supplier from './pages/Supplier';
import Stock from './pages/Stock';
import Name from './layout/Name';
import Dashboard from './pages/Dashboard';


function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <div className="sidebar-spacer"></div>
        <main className="main-content">
          <Routes>
              <Route path="/" element={<Name />} />

            {/* After animation, user is redirected here */}
            <Route path="/Dashboard" element={<Dashboard />} />

            <Route exact path="/Raw" element={<Raw />} />
             <Route path="/inventory/:usageType?" element={<InventoryManagement />} />
            <Route path="/inventory/edit/:InvId" element={<InventoryManagement />} />
            <Route exact path="/Supplier" element={<Supplier />} />
            <Route exact path="/Stock" element={<Stock />} />         
                     
            <Route exact path="/SaveSupplier" element={<Supplier />} />
            <Route exact path="/EditSupplier/:SupplierId" element={<Supplier />} />
           
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
