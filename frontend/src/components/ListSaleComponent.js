import React, { useEffect, useState } from 'react';
import { deleteSale, listSales } from '../services/SalesService';
import SalesComponent from './SalesComponent';

const ListSaleComponent = () => {
  const [sales, setSales] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);

  useEffect(() => {
    getAllSales();
  }, []);

  function openAddSale() {
    setShowAddForm(true);
  }

  function openUpdateSale(sale) {
    setSelectedSale(sale);
    setShowUpdateForm(true);
  }

  function getAllSales() {
    listSales()
      .then((response) => {
        setSales(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function removeSale(id) {
    deleteSale(id)
      .then(() => {
        getAllSales();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleCloseAddModal = () => {
    setShowAddForm(false);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateForm(false);
    setSelectedSale(null);
  };

  return React.createElement(
    'div',
    { className: 'container bg-light-green py-4 background-gradient' },
    React.createElement(
      'h1',
      { className: 'text-white mb-4 text-center' },
      'List of Sales'
    ),
    React.createElement(
      'div',
      { className: 'd-flex justify-content-end mb-3' },
      React.createElement(
        'button',
        {
          className: 'btn',
          style: { backgroundColor: '#1a3e2a', color: '#fff' },
          onClick: openAddSale
        },
        'Add Sale'
      )
    ),
    React.createElement(
      'div',
      { className: 'table-responsive' },
      React.createElement(
        'table',
        { className: 'table table-striped table-bordered align-middle' },
        React.createElement(
          'thead',
          { className: 'table-success text-center' },
          React.createElement(
            'tr',
            null,
            React.createElement('th', null, 'Sales ID'),
            React.createElement('th', null, 'Customer Name'),
            React.createElement('th', null, 'Product Name'),
            React.createElement('th', null, 'Unit Price'),
            React.createElement('th', null, 'Quantity'),
            React.createElement('th', null, 'Price'),
            React.createElement('th', null, 'Date'),
            React.createElement('th', null, 'Actions')
          )
        ),
        React.createElement(
          'tbody',
          null,
          sales.map((sale) =>
            React.createElement(
              'tr',
              { key: sale.id, className: 'text-center' },
              React.createElement('td', null, sale.id),
              React.createElement('td', null, sale.customer_name),
              React.createElement('td', null, sale.product_name),
              React.createElement('td', null, sale.unit_price),
              React.createElement('td', null, sale.quantity),
              React.createElement('td', null, sale.price),
              React.createElement('td', null, sale.date),
              React.createElement(
                'td',
                null,
                React.createElement(
                  'div',
                  { className: 'd-flex justify-content-center gap-2' },
                  React.createElement(
                    'button',
                    {
                      className: 'btn btn-info btn-sm',
                      onClick: () => openUpdateSale(sale)
                    },
                    'Update'
                  ),
                  React.createElement(
                    'button',
                    {
                      className: 'btn btn-danger btn-sm',
                      onClick: () => removeSale(sale.id)
                    },
                    'Delete'
                  )
                )
              )
            )
          )
        )
      )
    ),
    // Add Sale Modal
    showAddForm && React.createElement(
      'div',
      { 
        className: 'modal fade show',
        style: { display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }
      },
      React.createElement(
        'div',
        { className: 'modal-dialog modal-dialog-centered' },
        React.createElement(
          'div',
          { className: 'modal-content' },
          React.createElement(
            'div',
            { className: 'modal-header' },
            React.createElement(
              'h5',
              { className: 'modal-title' },
              'Add New Sale'
            ),
            React.createElement(
              'button',
              {
                type: 'button',
                className: 'btn-close',
                onClick: handleCloseAddModal
              }
            )
          ),
          React.createElement(
            'div',
            { className: 'modal-body' },
            React.createElement(SalesComponent, {
              onClose: handleCloseAddModal,
              onUpdate: () => {
                handleCloseAddModal();
                getAllSales();
              }
            })
          )
        )
      )
    ),
    // Update Sale Modal
    showUpdateForm && React.createElement(
      'div',
      { 
        className: 'modal fade show',
        style: { display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }
      },
      React.createElement(
        'div',
        { className: 'modal-dialog modal-dialog-centered' },
        React.createElement(
          'div',
          { className: 'modal-content' },
          React.createElement(
            'div',
            { className: 'modal-header' },
            React.createElement(
              'h5',
              { className: 'modal-title' },
              'Update Sale'
            ),
            React.createElement(
              'button',
              {
                type: 'button',
                className: 'btn-close',
                onClick: handleCloseUpdateModal
              }
            )
          ),
          React.createElement(
            'div',
            { className: 'modal-body' },
            React.createElement(SalesComponent, {
              sale: selectedSale,
              onClose: handleCloseUpdateModal,
              onUpdate: () => {
                handleCloseUpdateModal();
                getAllSales();
              }
            })
          )
        )
      )
    )
  );
};

export default ListSaleComponent;