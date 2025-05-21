import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SalesComponent({ sale, onClose, onUpdate }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    customer_name: '',
    product_name: '',
    unit_price: '',
    quantity: '',
    price: '',
    date: '',
    product_id: ''
  });

  useEffect(() => {
    fetchProducts();
    if (sale) {
      setFormData({
        customer_name: sale.customer_name,
        product_name: sale.product_name,
        unit_price: sale.unit_price,
        quantity: sale.quantity,
        price: sale.price,
        date: sale.date,
        product_id: sale.product_id
      });
    }
    setLoading(false);
  }, [sale]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/product');
      setProducts(response.data || []);
    } catch (err) {
      console.error('Error fetching products:', err);
      setProducts([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Validate form data
      if (!formData.customer_name.trim()) {
        setError('Customer name is required');
        return;
      }

      if (!formData.product_id) {
        setError('Product is required');
        return;
      }

      if (parseInt(formData.quantity) <= 0) {
        setError('Quantity must be greater than 0');
        return;
      }

      // Calculate price if not provided
      const unitPrice = parseFloat(formData.unit_price);
      const quantity = parseInt(formData.quantity);
      const calculatedPrice = unitPrice * quantity;

      const saleData = {
        customer_name: formData.customer_name.trim(),
        product_name: formData.product_name,
        unit_price: unitPrice,
        quantity: quantity,
        price: calculatedPrice,
        date: formData.date || new Date().toISOString().split('T')[0],
        product_id: parseInt(formData.product_id)
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };

      if (sale) {
        // Update existing sale
        await axios.put(`http://localhost:8080/api/Sold/${sale.id}`, saleData, config);
      } else {
        // Create new sale
        await axios.post('http://localhost:8080/api/Sold', saleData, config);
      }

      onUpdate();
    } catch (err) {
      console.error('Error saving sale:', err);
      if (err.response) {
        setError(`Failed to save sale: ${err.response.data?.message || err.response.statusText || 'Unknown error'}`);
      } else if (err.request) {
        setError('No response from server. Please check if the server is running.');
      } else {
        setError(`Error: ${err.message}`);
      }
    }
  };

  const handleProductChange = (e) => {
    const productId = e.target.value;
    const selectedProduct = products.find(p => p.productId === parseInt(productId));
    
    if (selectedProduct) {
      setFormData(prev => ({
        ...prev,
        product_id: productId,
        product_name: selectedProduct.name,
        unit_price: selectedProduct.unitPrice
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return React.createElement(
      'div',
      { className: 'text-center' },
      'Loading...'
    );
  }

  return React.createElement(
    'form',
    { onSubmit: handleSubmit },
    React.createElement(
      'div',
      { className: 'mb-3' },
      React.createElement(
        'label',
        { className: 'form-label' },
        'Customer Name'
      ),
      React.createElement('input', {
        type: 'text',
        className: 'form-control',
        name: 'customer_name',
        value: formData.customer_name,
        onChange: handleInputChange,
        required: true,
        placeholder: 'Enter customer name'
      })
    ),
    React.createElement(
      'div',
      { className: 'mb-3' },
      React.createElement(
        'label',
        { className: 'form-label' },
        'Product'
      ),
      React.createElement('select', {
        className: 'form-control',
        name: 'product_id',
        value: formData.product_id,
        onChange: handleProductChange,
        required: true
      },
        React.createElement('option', { value: '' }, 'Select a product'),
        products.map(product => 
          React.createElement('option', 
            { key: product.productId, value: product.productId },
            product.name
          )
        )
      )
    ),
    React.createElement(
      'div',
      { className: 'mb-3' },
      React.createElement(
        'label',
        { className: 'form-label' },
        'Unit Price'
      ),
      React.createElement('input', {
        type: 'number',
        className: 'form-control',
        name: 'unit_price',
        value: formData.unit_price,
        readOnly: true,
        placeholder: 'Unit price'
      })
    ),
    React.createElement(
      'div',
      { className: 'mb-3' },
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
        min: 1,
        placeholder: 'Enter quantity'
      })
    ),
    React.createElement(
      'div',
      { className: 'mb-3' },
      React.createElement(
        'label',
        { className: 'form-label' },
        'Date'
      ),
      React.createElement('input', {
        type: 'date',
        className: 'form-control',
        name: 'date',
        value: formData.date || new Date().toISOString().split('T')[0],
        onChange: handleInputChange,
        required: true
      })
    ),
    error && React.createElement(
      'div',
      { className: 'alert alert-danger mb-3' },
      error
    ),
    React.createElement(
      'div',
      { className: 'modal-footer' },
      React.createElement(
        'button',
        {
          type: 'button',
          className: 'btn btn-secondary',
          onClick: onClose
        },
        'Cancel'
      ),
      React.createElement(
        'button',
        {
          type: 'submit',
          className: 'btn btn-primary'
        },
        sale ? 'Update Sale' : 'Add Sale'
      )
    )
  );
}

export default SalesComponent;