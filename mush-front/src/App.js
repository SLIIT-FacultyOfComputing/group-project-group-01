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

function App() {
  return (
    <div 
    className="App flex items-center justify-center text-white"
    style={{
    height: "900px",
    background: 'radial-gradient(circle,rgb(157, 192, 139), rgb(86, 138, 91),rgb(53, 78, 45) )',
    padding: "150px"
    }}>
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
      </Routes>
      </Router>
    </div>
  );
}

export default App;
