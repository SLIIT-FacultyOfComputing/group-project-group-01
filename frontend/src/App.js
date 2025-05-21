import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import SalesManagement from './components/SalesManagement';
import PreorderManagement from './components/PreorderManagement';
import Inventory from './components/Inventory';
import AllocationComponent from './components/AllocationComponent';
import BranchComponent from './components/BranchComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Navbar />
        <div className="main-content">
          <Routes>
           
            <Route path="/" element={<SalesManagement />} />
            <Route path="/sales" element={<SalesManagement />} />
            <Route path="/sales/new" element={<SalesManagement />} />            
            <Route path="/preorders" element={<PreorderManagement />} />
            <Route path="/preorders/new" element={<PreorderManagement />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/allocations" element={<AllocationComponent />} />
            <Route path="/branches" element={<BranchComponent />} />
            
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
