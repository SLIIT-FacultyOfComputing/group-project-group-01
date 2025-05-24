import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  
  return (
    <div>

<nav className="navbar navbar-expand-lg navbar-dark" 
style={{ background: "transparent",
position:"absolute",
top:"0", 
zIndex: 1000}}>

  <div className="container-fluid">

    <a className="navbar-brand" href="/"
      style={{
      fontFamily: "'Dancing Script', cursive", 
      fontSize: "1.3rem",
      marginLeft:"-140px"}}>
      Fungi Flow 
      </a>

    <Link className='btn' 
    style={{ 
      background:"transparent",
      color:"white"}} to="/"> Home </Link>

    <Link className='btn'
     style={{
       background:"transparent", 
       color:"white"}} to="/SaveSupplier"> Suppliers </Link>

    <Link className='btn'
     style={{ 
      background:"transparent",
       color:"white"}} to= "/SaveInv"> Allocation </Link>

    <Link className='btn'
     style={{ 
      background:"transparent",
       color:"white"}} to="/SaveRaw">Material</Link>
    
    <div className="dropdown">
    <button 
     className="btn btn-secondary dropdown-toggle"
     type="button"
     id="dropdownMenuButton"
     data-bs-toggle="dropdown"
     aria-expanded="false"
     style={{
       background: "transparent",
       color: "white",
       border: "none",
     }}
     >
        Analytics
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <Link className="dropdown-item" to="/Raw">
                  Purchased Raws
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/Inv">
                  Allocated Raws
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/Supplier">
                  Supplier Details
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/Stock">
                  Stock Level
                </Link>
              </li>
              </ul>
            </div>
        </div>
      </nav>
    </div>
  )
}
