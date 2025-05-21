import React, { useEffect, useState } from 'react';
import { deletePreorder, listPreorders } from '../services/PreordersService';
import { useNavigate } from 'react-router-dom';

const ListPreorderComponent = () => {
  const [Preorders, setPreorders] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    getAllPreorders();
  }, []);

  function addNewpreorder() {
    navigator('/add-preorder');
  }

  function updatePreorders(id) {
    navigator(`/edit-preorders/${id}`);
  }

  function getAllPreorders() {
    listPreorders()
      .then((response) => {
        setPreorders(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function removePreorder(id) {
    deletePreorder(id)
      .then(() => {
        getAllPreorders();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return React.createElement(
    'div',
    { className: 'container bg-light-green py-4 background-gradient' },
    React.createElement(
      'h1',
      { className: 'text-white mb-4 text-center' },
      'List of Preorders'
    ),
    React.createElement(
      'div',
      { className: 'd-flex justify-content-end mb-3' },
      React.createElement(
        'button',
        {
          className: 'btn',
          style: { backgroundColor: '#1a3e2a', color: '#fff' },
          onClick: addNewpreorder
        },
        'Pre Oders'
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
            React.createElement('th', null, 'Preorders ID'),
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
          Preorders.map((preorder) =>
            React.createElement(
              'tr',
              { key: preorder.id, className: 'text-center' },
              React.createElement('td', null, preorder.id),
              React.createElement('td', null, preorder.customer_name),
              React.createElement('td', null, preorder.product_name),
              React.createElement('td', null, preorder.unit_price),
              React.createElement('td', null, preorder.quantity),
              React.createElement('td', null, preorder.price),
              React.createElement('td', null, preorder.date),
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
                      onClick: () => updatePreorders(preorder.id)
                    },
                    'Update'
                  ),
                  React.createElement(
                    'button',
                    {
                      className: 'btn btn-danger btn-sm',
                      onClick: () => removePreorder(preorder.id)
                    },
                    'Delete'
                  )
                )
              )
            )
          )
        )
      )
    )
  );
};

export default ListPreorderComponent;