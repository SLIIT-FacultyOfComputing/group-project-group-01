import React from 'react';

const HeaderComponent = () => {
  return (
    <div>
      <header>
        <nav className='navbar navbar-expand-lg navbar-dark' style={{ backgroundColor: '#189e39' }}>
          <div className='w-100 text-center'>
            <a className='navbar-brand mx-auto' href='https://www.javaguides.net'>
              Sales Management System
            </a>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default HeaderComponent;
