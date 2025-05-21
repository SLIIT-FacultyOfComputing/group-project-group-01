import React, { useState, useEffect } from 'react';
import { createPreorder, getPreorder, updatePreorder } from '../services/PreordersService';
import { useNavigate, useParams } from 'react-router-dom';

const PreorderComponent = () => {
  const [customer_name, setCustomerName] = useState('');
  const [product_name, setProductName] = useState('');
  const [unit_price, setUnitPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [date, setDate] = useState('');

  const { id } = useParams();
  const [errors, setErrors] = useState({
    customer_name: '',
    product_name: '',
    unit_price: '',
    quantity: '',
    price: '',
    date: ''
  });

  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getPreorder(id)
        .then((response) => {
          setCustomerName(response.data.customer_name);
          setProductName(response.data.product_name);
          setUnitPrice(response.data.unit_price);
          setQuantity(response.data.quantity);
          setPrice(response.data.price);
          setDate(response.data.date);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      setDate(formattedDate);
    }
  }, [id]);

  useEffect(() => {
    if (unit_price && quantity) {
      const calculatedPrice = parseFloat(unit_price) * parseFloat(quantity);
      if (!isNaN(calculatedPrice)) {
        setPrice(calculatedPrice.toString());
      }
    }
  }, [unit_price, quantity]);

  function validateForm() {
    let valid = true;
    const errorscopy = { ...errors };

    if (customer_name.trim()) {
      errorscopy.customer_name = '';
    } else {
      errorscopy.customer_name = 'Customer name is required';
      valid = false;
    }

    if (product_name.trim()) {
      errorscopy.product_name = '';
    } else {
      errorscopy.product_name = 'Product name is required';
      valid = false;
    }

    if (String(quantity).trim()) {
      errorscopy.quantity = '';
    } else {
      errorscopy.quantity = 'Quantity is required';
      valid = false;
    }

    if (String(price).trim()) {
      errorscopy.price = '';
    } else {
      errorscopy.price = 'Price is required';
      valid = false;
    }

    setErrors(errorscopy);
    return valid;
  }

  function saveOrupdatePreorder(e) {
    e.preventDefault();

    if (validateForm()) {
      const preorder = { customer_name, product_name, unit_price, quantity, price, date };

      const callback = () => navigator('/preorders');

      const action = id ? updatePreorder(id, preorder) : createPreorder(preorder);
      action
        .then((response) => {
          console.log(response.data);
          callback();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  function inputField(label, value, setValue, name, isInvalid, errorText, type = 'text', placeholder = '') {
    return React.createElement(
      'div',
      { className: 'form-group mb-3' },
      React.createElement('label', { className: 'form-label text-black' }, label),
      React.createElement('input', {
        type,
        name,
        placeholder,
        value,
        onChange: (e) => setValue(e.target.value),
        className: `form-control${isInvalid ? ' is-invalid' : ''}`
      }),
      isInvalid && React.createElement('div', { className: 'invalid-feedback' }, errorText)
    );
  }

  const title = React.createElement(
    'h2',
    { className: 'text-center mb-4' },
    id ? 'Update Preorder' : 'Add Preorder'
  );

  return React.createElement(
    'div',
    { className: 'container d-flex justify-content-center align-items-center min-vh-100' },
    React.createElement(
      'div',
      { className: 'row w-100' },
      React.createElement(
        'div',
        { className: 'card col-md-6 mx-auto shadow-lg rounded-4 bg-light-green card-body-custom' },
        title,
        React.createElement(
          'div',
          { className: 'card-body p-4' },
          React.createElement(
            'form',
            null,
            inputField(
              'Customer Name',
              customer_name,
              setCustomerName,
              'customer_name',
              errors.customer_name,
              errors.customer_name,
              'text',
              'Enter customer name'
            ),
            inputField(
              'Product Name',
              product_name,
              setProductName,
              'product_name',
              errors.product_name,
              errors.product_name,
              'text',
              'Enter product name'
            ),
            inputField(
              'Unit Price',
              unit_price,
              setUnitPrice,
              'unit_price',
              false,
              '',
              'text',
              'Enter unit price'
            ),
            inputField(
              'Quantity',
              quantity,
              setQuantity,
              'quantity',
              errors.quantity,
              errors.quantity,
              'text',
              'Enter quantity'
            ),
            inputField(
              'Price',
              price,
              setPrice,
              'price',
              errors.price,
              errors.price,
              'text',
              'Enter price'
            ),
            inputField('Date', date, setDate, 'date', false, '', 'text', 'Enter date'),
            React.createElement(
              'button',
              {
                className: 'btn btn-green w-100',
                onClick: saveOrupdatePreorder
              },
              'Submit'
            )
          )
        )
      )
    )
  );
};

export default PreorderComponent;