import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListSaleComponent from './components/ListSaleComponent';
import SalesComponent from './components/SalesComponent';
import PreorderComponent from './components/PreorderComponent';
import ListPreorderComponent from './components/ListPreorderComponent';
import Inventory from './components/InventoryComponent';
import AllocationComponent from './components/AllocationComponent';
import BranchComponent from './components/BranchComponent';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* Home: http://localhost:3000 */}
          <Route path="/" element={<ListSaleComponent />} />
          {/* Sales */}
          <Route path="/sales" element={<ListSaleComponent />} />
          <Route path="/add-sale" element={<SalesComponent />} />
          <Route path="/edit-sales/:id" element={<SalesComponent />} />
          
          {/* Inventory */}
          <Route path="/inventory" element={<Inventory />} />

          {/* Preorders */}
          <Route path="/preorder" element={<ListPreorderComponent />} />
          <Route path="/preorders" element={<ListPreorderComponent />} />
          <Route path="/add-preorder" element={<PreorderComponent />} />
          <Route path="/edit-preorders/:id" element={<PreorderComponent />} />

          {/* Allocations */}
          <Route path="/allocations" element={<AllocationComponent />} />

          {/* Branches */}
          <Route path="/branches" element={<BranchComponent />} />
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;