import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListSaleComponent from './components/ListSaleComponent'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SalesComponent from './components/SalesComponent'




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
      </Routes>
      <FooterComponent/>
      </BrowserRouter>
    </>
  )
}

export default App
