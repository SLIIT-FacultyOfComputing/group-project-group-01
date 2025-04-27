import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';


const HeaderComponent = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const goToInventory = () => {
    navigate('/inventory');
    setMenuOpen(false); 
  };

  const goToSalesList = () => {
    navigate('/sales');
    setMenuOpen(false); 
  };

  const goToPreorderList = () => {
    navigate('/preorders');
    setMenuOpen(false); 
  };
  

  return (
    <div>
      <header>
        <nav className='navbar navbar-expand-lg navbar-dark' style={{ backgroundColor: '#1a3e2a', position: 'relative' }}>
          <div className='container-fluid justify-content-between'>

            <div className="d-flex justify-content-between w-100 align-items-center">

              <div className="flex-grow-1 text-left">
                <a className='navbar-brand mx-auto' >
                  Fungi Flow
                </a>
              </div>

              <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ cursor: 'pointer', marginRight: '1rem' }}>
                <div className="bar" style={{ width: '25px', height: '3px', backgroundColor: 'white', margin: '4px 0' }}></div>
                <div className="bar" style={{ width: '25px', height: '3px', backgroundColor: 'white', margin: '4px 0' }}></div>
                <div className="bar" style={{ width: '25px', height: '3px', backgroundColor: 'white', margin: '4px 0' }}></div>
              </div>
            </div>

            {menuOpen && (
              <div className="dropdown-menu show" style={{
                position: 'absolute',
                top: '60px',
                right: '20px',
                backgroundColor: '#1a3e2a',
                borderRadius: '5px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                zIndex: 1000,
                minWidth: '150px'
              }}>
                <button className="dropdown-item text-white" onClick={goToInventory} style={{ borderBottom: '1px solid #2d6a4f', background: 'none', border: 'none' }}>
                  Inventory
                </button>
                <button className="dropdown-item text-white" onClick={goToSalesList} style={{ background: 'none', border: 'none' }}>
                  Sales List
                </button>

                <button className="dropdown-item text-white" onClick={goToPreorderList} style={{ background: 'none', border: 'none' }}>
                  Pre Order List
                </button>
              </div>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};


export default HeaderComponent;