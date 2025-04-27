import './App.css';
import"../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';
import Raw from './pages/Raw';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import SaveRaw from './Raws/SaveRaw';
import EditRaw from './Raws/EditRaw';
import SaveInv from './Invs/SaveInv';
import EditInv from './Invs/EditInv';
import SaveSupplier from './Supplier/SaveSupplier'
import EditSupplier from './Supplier/EditSupplier';
import Supplier from './pages/Supplier';
import Inv from './pages/Inv';
import Stock from './pages/Stock';
import Name from './layout/Name';
import Dashboard from './pages/Dashboard';
import InvLab from './pages/InvLab';
import InvSales from './pages/InvSales';
import InvOther from './pages/InvOther';

function App() {
  return (
    <div 
    className="appBackground flex items-center justify-center text-white">
      <Router>  
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Name/>}/>
        <Route exact path="/Dashboard" element={<Dashboard/>}/>
        <Route exact path="/Raw" element={<Raw/>}/>
        <Route exact path="/Inv" element={<Inv/>}/>
        <Route exact path="/Supplier" element={<Supplier/>}/>
        <Route exact path="/Stock" element={<Stock/>}/>
        <Route exact path="/SaveRaw" element={<SaveRaw/>}/>
        <Route exact path="/EditRaw/:RawId" element={<EditRaw/>}/>
        <Route exact path="/SaveInv" element={<SaveInv/>}/>
        <Route exact path="/EditInv/:InvId" element={<EditInv/>}/>
        <Route exact path="/SaveSupplier" element={<SaveSupplier/>}/>
        <Route exact path="/EditSupplier/:SupplierId" element={<EditSupplier/>}/>
        <Route exact path="/InvLab" element={<InvLab/>}/>
        <Route exact path="/InvSales" element={<InvSales/>}/>
        <Route exact path="/InvOther" element={<InvOther/>}/>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
