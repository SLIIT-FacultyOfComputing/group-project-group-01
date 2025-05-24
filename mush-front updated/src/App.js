import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from './layout/Navbar';
import Raw from './pages/Raw';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import InventoryManagement from './pages/InventoryManagement';
import Supplier from './pages/Supplier';
import Stock from './pages/Stock';
import Name from './layout/Name';
import Dashboard from './pages/Dashboard';
import Login from './auth/Login';
import Signup from './auth/Signup';
import ProtectedLayout from './auth/ProtectedRoute';

const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/Login' || location.pathname === '/Signup';

  return (
    <>
      {!isAuthPage && <Navbar />}
      <div className="sidebar-spacer"></div>
      <main className="main-content">
        {children}
      </main>
    </>
  );
};

function App() {
  return (
    <div>
      <Router>
        <Layout>
          <Routes>
            
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route element={<ProtectedLayout />}>
              <Route path="/" element={<Name />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/Raw" element={<Raw />} />
              <Route path="/inventory/:usageType?" element={<InventoryManagement />} />
              <Route path="/inventory/edit/:InvId" element={<InventoryManagement />} />
              <Route path="/Supplier" element={<Supplier />} />
              <Route path="/Stock" element={<Stock />} />
              <Route path="/SaveSupplier" element={<Supplier />} />
              <Route path="/EditSupplier/:SupplierId" element={<Supplier />} />
            </Route>
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
