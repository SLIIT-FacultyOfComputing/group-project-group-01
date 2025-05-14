import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListSaleComponent from './components/ListSaleComponent'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SalesComponent from './components/SalesComponent'
import PreorderComponent from './components/PreorderComponent'
import ListPreorderComponent from './components/ListPreorderComponent'
import Inventory from './components/inventory';




function App() {
  

  return (
    <>
      <BrowserRouter>
      <HeaderComponent/>
      <Routes>
        {/* //http://localhost:3000 */}
        <Route path= '/' element = { <ListSaleComponent/>}></Route>
        {/* //http://localhost:3000/sales */}
        <Route path= '/sales' element = {<ListSaleComponent/>}></Route>
        <Route path= '/add-sale' element = {<SalesComponent/>}></Route>

        {/* //http://localhost:3000/edit-sales/1 */}
        <Route path='/edit-sales/:id' element = {<SalesComponent/>}></Route>
        <Route path='/inventory' element={<Inventory />}></Route>
        {/* //http://localhost:3000/preorder */}
        <Route path='/preorder' element={<ListPreorderComponent />}></Route>
        
        {/* //http://localhost:3000/preorders */}
        <Route path='/preorders' element={<ListPreorderComponent />}></Route>
        <Route path='/add-preorder' element={<PreorderComponent />}></Route>
        {/* //http://localhost:3000/edit-preorders/1 */}
        <Route path='/edit-preorders/:id' element={<PreorderComponent />}></Route>
        

      </Routes>
      <FooterComponent/>
      </BrowserRouter>
    </>
  )
}

export default App
