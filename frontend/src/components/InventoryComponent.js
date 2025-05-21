import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Inventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    unitPrice: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/product');
      console.log('Fetched products:', response.data);
      setProducts(response.data || []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      console.error('Error response:', err.response?.data);
      setProducts([]);
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors

    try {
      // Validate form data
      if (!formData.name.trim()) {
        setError('Product name is required');
        return;
      }

      if (parseInt(formData.quantity) < 0) {
        setError('Quantity cannot be negative');
        return;
      }

      if (parseFloat(formData.unitPrice) <= 0) {
        setError('Unit price must be greater than 0');
        return;
      }

      // Create new product with exact DTO field names
      const productData = {
        name: formData.name.trim(),
        quantity: parseInt(formData.quantity),
        unitPrice: parseFloat(formData.unitPrice)
      };

      console.log('Attempting to create product with data:', productData);

      // Set headers explicitly
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };

      const response = await axios.post('http://localhost:8080/api/product', productData, config);
      console.log('Product created successfully:', response.data);

      // Clear form and close
      setFormData({ name: '', quantity: '', unitPrice: '' });
      setShowAddForm(false);
      
      // Refresh the product list
      await fetchProducts();
    } catch (err) {
      console.error('Error creating product:', err);
      console.error('Error response:', err.response?.data);
      console.error('Error status:', err.response?.status);
      console.error('Error headers:', err.response?.headers);

      // More detailed error message
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(`Failed to add product: ${err.response.data?.message || err.response.statusText || 'Unknown error'}`);
      } else if (err.request) {
        // The request was made but no response was received
        setError('No response from server. Please check if the server is running.');
      } else {
        // Something happened in setting up the request that triggered an Error
        setError(`Error: ${err.message}`);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return React.createElement(
    'div',
    { className: 'container bg-light-green py-4 background-gradient' },
    React.createElement(
      'div',
      { className: 'd-flex justify-content-between align-items-center mb-4' },
      React.createElement(
        'h2',
        { className: 'text-white mb-0' },
        'Product Inventory'
      ),
      React.createElement(
        'button',
        {
          className: 'btn btn-success',
          onClick: () => setShowAddForm(true)
        },
        'Add New Product'
      )
    ),
    error && React.createElement(
      'div',
      { className: 'alert alert-danger mb-4' },
      error
    ),
    showAddForm && React.createElement(
      'div',
      { className: 'card mb-4' },
      React.createElement(
        'div',
        { className: 'card-body' },
        React.createElement(
          'h3',
          { className: 'card-title mb-3' },
          'Add New Product'
        ),
        React.createElement(
          'form',
          { onSubmit: handleAddProduct },
          React.createElement(
            'div',
            { className: 'row' },
            React.createElement(
              'div',
              { className: 'col-md-4 mb-3' },
              React.createElement(
                'label',
                { className: 'form-label' },
                'Product Name'
              ),
              React.createElement('input', {
                type: 'text',
                className: 'form-control',
                name: 'name',
                value: formData.name,
                onChange: handleInputChange,
                required: true,
                placeholder: 'Enter product name'
              })
            ),
            React.createElement(
              'div',
              { className: 'col-md-4 mb-3' },
              React.createElement(
                'label',
                { className: 'form-label' },
                'Quantity'
              ),
              React.createElement('input', {
                type: 'number',
                className: 'form-control',
                name: 'quantity',
                value: formData.quantity,
                onChange: handleInputChange,
                required: true,
                min: 0,
                placeholder: 'Enter quantity'
              })
            ),
            React.createElement(
              'div',
              { className: 'col-md-4 mb-3' },
              React.createElement(
                'label',
                { className: 'form-label' },
                'Unit Price'
              ),
              React.createElement('input', {
                type: 'number',
                className: 'form-control',
                name: 'unitPrice',
                value: formData.unitPrice,
                onChange: handleInputChange,
                required: true,
                min: 0.01,
                step: 0.01,
                placeholder: 'Enter unit price'
              })
            )
          ),
          React.createElement(
            'div',
            { className: 'd-flex justify-content-end gap-2' },
            React.createElement(
              'button',
              {
                type: 'button',
                className: 'btn btn-secondary',
                onClick: () => {
                  setShowAddForm(false);
                  setError(null);
                }
              },
              'Cancel'
            ),
            React.createElement(
              'button',
              {
                type: 'submit',
                className: 'btn btn-primary'
              },
              'Add Product'
            )
          )
        )
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
            React.createElement('th', null, 'ID'),
            React.createElement('th', null, 'Product Name'),
            React.createElement('th', null, 'Quantity'),
            React.createElement('th', null, 'Unit Price'),
            React.createElement('th', null, 'Status')
          )
        ),
        React.createElement(
          'tbody',
          null,
          products.length > 0 ? products.map((product) => {
            const status = product.quantity > 0 ? 
              (product.quantity < 10 ? 'Low Stock' : 'In Stock') : 
              'Out of Stock';
            const statusClass = product.quantity > 0 ? 
              (product.quantity < 10 ? 'text-warning' : 'text-success') : 
              'text-danger';
            
            return React.createElement(
              'tr',
              { key: product.productId, className: 'text-center' },
              React.createElement('td', null, product.productId),
              React.createElement('td', null, product.name),
              React.createElement('td', null, product.quantity),
              React.createElement('td', null, `${product.unitPrice.toFixed(2)}`),
              React.createElement(
                'td',
                null,
                React.createElement(
                  'span',
                  { className: statusClass },
                  status
                )
              )
            );
          }) : React.createElement(
            'tr',
            null,
            React.createElement(
              'td',
              { colSpan: 5, className: 'text-center' },
              'No products found'
            )
          )
        )
      )
    )
  );
}

export default Inventory;