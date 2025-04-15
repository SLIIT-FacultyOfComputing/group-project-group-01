import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddMaterials from './Materials/AddMaterials';
import EditMaterials from './Materials/EditMaterials';
import ViewMaterials from './Materials/ViewMaterials';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/addmaterial" element = {<AddMaterials/>} />
          <Route exact path="/editmaterial/:id" element={<EditMaterials/>}/>
          <Route path="/viewmaterial/:id" element={<ViewMaterials/>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
