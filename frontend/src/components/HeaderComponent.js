import React, { useState } from 'react';
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

  const goToAllocations = () => {
    navigate('/allocations');
    setMenuOpen(false);
  };

  const goToBranches = () => {
    navigate('/branches');
    setMenuOpen(false);
  };

  return React.createElement(
    'div',
    null,
    React.createElement(
      'header',
      null,
      React.createElement(
        'nav',
        {
          className: 'navbar navbar-expand-lg navbar-dark',
          style: { backgroundColor: '#1a3e2a', position: 'relative' }
        },
        React.createElement(
          'div',
          { className: 'container-fluid justify-content-between' },
          React.createElement(
            'div',
            { className: 'd-flex justify-content-between w-100 align-items-center' },
            React.createElement(
              'div',
              { className: 'flex-grow-1 text-left' },
              React.createElement(
                'a',
                { className: 'navbar-brand mx-auto' },
                'Fungi Flow'
              )
            ),
            React.createElement(
              'div',
              {
                className: 'hamburger',
                onClick: () => setMenuOpen(!menuOpen),
                style: { cursor: 'pointer', marginRight: '1rem' }
              },
              React.createElement('div', {
                className: 'bar',
                style: {
                  width: '25px',
                  height: '3px',
                  backgroundColor: 'white',
                  margin: '4px 0'
                }
              }),
              React.createElement('div', {
                className: 'bar',
                style: {
                  width: '25px',
                  height: '3px',
                  backgroundColor: 'white',
                  margin: '4px 0'
                }
              }),
              React.createElement('div', {
                className: 'bar',
                style: {
                  width: '25px',
                  height: '3px',
                  backgroundColor: 'white',
                  margin: '4px 0'
                }
              })
            )
          ),
          menuOpen &&
            React.createElement(
              'div',
              {
                className: 'dropdown-menu show',
                style: {
                  position: 'absolute',
                  top: '60px',
                  right: '20px',
                  backgroundColor: '#1a3e2a',
                  borderRadius: '5px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                  zIndex: 1000,
                  minWidth: '150px'
                }
              },
              React.createElement(
                'button',
                {
                  className: 'dropdown-item text-white',
                  onClick: goToInventory,
                  style: {
                    borderBottom: '1px solid #2d6a4f',
                    background: 'none',
                    border: 'none'
                  }
                },
                'Inventory'
              ),
              React.createElement(
                'button',
                {
                  className: 'dropdown-item text-white',
                  onClick: goToSalesList,
                  style: {
                    borderBottom: '1px solid #2d6a4f',
                    background: 'none',
                    border: 'none'
                  }
                },
                'Sales List'
              ),
              React.createElement(
                'button',
                {
                  className: 'dropdown-item text-white',
                  onClick: goToPreorderList,
                  style: {
                    borderBottom: '1px solid #2d6a4f',
                    background: 'none',
                    border: 'none'
                  }
                },
                'Pre Order List'
              ),
              React.createElement(
                'button',
                {
                  className: 'dropdown-item text-white',
                  onClick: goToAllocations,
                  style: {
                    borderBottom: '1px solid #2d6a4f',
                    background: 'none',
                    border: 'none'
                  }
                },
                'Allocations'
              ),
              React.createElement(
                'button',
                {
                  className: 'dropdown-item text-white',
                  onClick: goToBranches,
                  style: {
                    background: 'none',
                    border: 'none'
                  }
                },
                'Branches'
              )
            )
        )
      )
    )
  );
};

export default HeaderComponent;