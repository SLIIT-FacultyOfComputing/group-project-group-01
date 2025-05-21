import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

function AllocationComponent() {
    
    const [allocations, setAllocations] = useState([]);
    const [products, setProducts] = useState([]);
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedAllocation, setSelectedAllocation] = useState(null);
    const [formData, setFormData] = useState({
        branchId: '',
        productId: '',
        totalQty: '',
        allocatedQty: '',
        date: new Date().toISOString().split('T')[0]
    });

    // Fetch data on component mount
    useEffect(() => {
        fetchData();
    }, []);

    // Fetch all required data
    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch allocations
            const allocationsResponse = await axios.get(`${API_BASE_URL}/allocations`);
            setAllocations(allocationsResponse.data);

            // Fetch products
            const productsResponse = await axios.get(`${API_BASE_URL}/product`);
            setProducts(productsResponse.data);

            // Fetch branches
            const branchesResponse = await axios.get(`${API_BASE_URL}/branch`);
            setBranches(branchesResponse.data);

        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Failed to load data. Please check if the server is running.');
        } finally {
            setLoading(false);
        }
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'productId') {
            // When product is selected, set the total quantity from inventory
            const selectedProduct = products.find(p => p.productId === parseInt(value));
            setFormData(prev => ({
                ...prev,
                [name]: value,
                totalQty: selectedProduct ? selectedProduct.quantity : ''
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // Reset form data
    const resetForm = () => {
        setFormData({
            branchId: '',
            productId: '',
            totalQty: '',
            allocatedQty: '',
            date: new Date().toISOString().split('T')[0]
        });
    };

    // Handle add allocation
    const handleAddAllocation = async (e) => {
        e.preventDefault();
        try {
            console.log('Creating allocation with data:', formData);
            
            // Validate form data
            if (!formData.branchId || !formData.productId || !formData.totalQty || !formData.allocatedQty || !formData.date) {
                throw new Error('All fields are required');
            }

            // Validate quantities
            if (parseInt(formData.allocatedQty) > parseInt(formData.totalQty)) {
                throw new Error('Allocated quantity cannot be greater than total quantity');
            }

            // Format the data to match AllocationDto
            const allocationData = {
                branchId: parseInt(formData.branchId),
                product_id: parseInt(formData.productId),
                totalQty: parseInt(formData.totalQty),
                allocatedQty: parseInt(formData.allocatedQty),
                date: formData.date
            };

            console.log('Sending allocation data:', allocationData);
            
            const response = await axios.post(`${API_BASE_URL}/allocations`, allocationData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Allocation created successfully:', response.data);
            setAllocations([...allocations, response.data]);
            setShowAddForm(false);
            resetForm();
        } catch (err) {
            console.error('Error creating allocation:', err);
            let errorMessage = 'Failed to create allocation';
            
            if (err.response) {
                console.error('Error response:', {
                    status: err.response.status,
                    data: err.response.data
                });
                errorMessage = err.response.data?.message || `Server error: ${err.response.status}`;
            } else if (err.request) {
                console.error('No response received:', err.request);
                errorMessage = 'No response from server. Please check if the server is running.';
            } else {
                errorMessage = err.message;
            }
            
            setError(errorMessage);
        }
    };

    // Handle update allocation
    const handleUpdateAllocation = async (e) => {
        e.preventDefault();
        try {
            console.log('Updating allocation with data:', formData);
            
            // Validate form data
            if (!formData.branchId || !formData.productId || !formData.totalQty || !formData.allocatedQty || !formData.date) {
                throw new Error('All fields are required');
            }

            // Validate quantities
            if (parseInt(formData.allocatedQty) > parseInt(formData.totalQty)) {
                throw new Error('Allocated quantity cannot be greater than total quantity');
            }

            // Format the data to match AllocationDto
            const allocationData = {
                branchId: parseInt(formData.branchId),
                product_id: parseInt(formData.productId),
                totalQty: parseInt(formData.totalQty),
                allocatedQty: parseInt(formData.allocatedQty),
                date: formData.date
            };

            console.log('Sending update data:', allocationData);
            
            const response = await axios.put(`${API_BASE_URL}/allocations/${selectedAllocation.id}`, allocationData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Allocation updated successfully:', response.data);
            setAllocations(allocations.map(allocation => 
                allocation.id === selectedAllocation.id ? response.data : allocation
            ));
            setShowUpdateForm(false);
            resetForm();
        } catch (err) {
            console.error('Error updating allocation:', err);
            let errorMessage = 'Failed to update allocation';
            
            if (err.response) {
                console.error('Error response:', {
                    status: err.response.status,
                    data: err.response.data
                });
                errorMessage = err.response.data?.message || `Server error: ${err.response.status}`;
            } else if (err.request) {
                console.error('No response received:', err.request);
                errorMessage = 'No response from server. Please check if the server is running.';
            } else {
                errorMessage = err.message;
            }
            
            setError(errorMessage);
        }
    };

    // Handle delete allocation
    const handleDeleteAllocation = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/allocations/${id}`);
            setAllocations(allocations.filter(allocation => allocation.id !== id));
        } catch (err) {
            console.error('Error deleting allocation:', err);
            setError('Failed to delete allocation');
        }
    };

    // Open add modal
    const openAddModal = () => {
        resetForm();
        setShowAddForm(true);
    };

    // Open update modal
    const openUpdateModal = (allocation) => {
        setSelectedAllocation(allocation);
        setFormData({
            branchId: allocation.branchId,
            productId: allocation.product_id,
            totalQty: allocation.totalQty,
            allocatedQty: allocation.allocatedQty,
            date: allocation.date
        });
        setShowUpdateForm(true);
    };

    // Loading state
    if (loading) {
        return (
            <div className="container mt-4">
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    // Error state with retry button
    if (error) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger" role="alert">
                    <h4 className="alert-heading">Error</h4>
                    <p>{error}</p>
                    <hr />
                    <button 
                        className="btn btn-primary"
                        onClick={() => {
                            setError(null);
                            fetchData();
                        }}
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Allocations Management</h2>
            
            {/* Add Allocation Button */}
            <div className="mb-3">
                <button 
                    className="btn btn-primary"
                    onClick={openAddModal}
                >
                    Add New Allocation
                </button>
            </div>

            {/* Allocations Table */}
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Branch</th>
                            <th>Location</th>
                            <th>Product ID</th>
                            <th>Total Quantity</th>
                            <th>Allocated Quantity</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allocations.map((allocation) => (
                            <tr key={allocation.id}>
                                <td>{allocation.id}</td>
                                <td>
                                    {branches.find(b => b.id === allocation.branchId)?.branchName || allocation.branchId}
                                </td>
                                <td>
                                    {branches.find(b => b.id === allocation.branchId)?.location || 'N/A'}
                                </td>
                                <td>{allocation.product_id}</td>
                                <td>{allocation.totalQty}</td>
                                <td>{allocation.allocatedQty}</td>
                                <td>{allocation.date}</td>
                                <td>
                                    <button
                                        className="btn btn-info btn-sm me-2"
                                        onClick={() => openUpdateModal(allocation)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDeleteAllocation(allocation.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Allocation Modal */}
            {showAddForm && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Allocation</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowAddForm(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleAddAllocation}>
                                    <div className="mb-3">
                                        <label className="form-label">Branch</label>
                                        <select
                                            className="form-control"
                                            name="branchId"
                                            value={formData.branchId}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select a branch</option>
                                            {branches.map(branch => (
                                                <option key={branch.id} value={branch.id}>
                                                    {branch.branchName} - {branch.location}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Product</label>
                                        <select
                                            className="form-control"
                                            name="productId"
                                            value={formData.productId}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select a product</option>
                                            {products.map(product => (
                                                <option key={product.productId} value={product.productId}>
                                                    {product.name} (ID: {product.productId}, Available: {product.quantity})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Total Quantity</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="totalQty"
                                            value={formData.totalQty}
                                            onChange={handleInputChange}
                                            required
                                            min="0"
                                            readOnly
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Allocated Quantity</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="allocatedQty"
                                            value={formData.allocatedQty}
                                            onChange={handleInputChange}
                                            required
                                            min="0"
                                            max={formData.totalQty}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => setShowAddForm(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            Add Allocation
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Update Allocation Modal */}
            {showUpdateForm && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update Allocation</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowUpdateForm(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleUpdateAllocation}>
                                    <div className="mb-3">
                                        <label className="form-label">Branch</label>
                                        <select
                                            className="form-control"
                                            name="branchId"
                                            value={formData.branchId}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select a branch</option>
                                            {branches.map(branch => (
                                                <option key={branch.id} value={branch.id}>
                                                    {branch.branchName} - {branch.location}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Product</label>
                                        <select
                                            className="form-control"
                                            name="productId"
                                            value={formData.productId}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select a product</option>
                                            {products.map(product => (
                                                <option key={product.productId} value={product.productId}>
                                                    {product.name} (ID: {product.productId}, Available: {product.quantity})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Total Quantity</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="totalQty"
                                            value={formData.totalQty}
                                            onChange={handleInputChange}
                                            required
                                            min="0"
                                            readOnly
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Allocated Quantity</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="allocatedQty"
                                            value={formData.allocatedQty}
                                            onChange={handleInputChange}
                                            required
                                            min="0"
                                            max={formData.totalQty}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => setShowUpdateForm(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            Update Allocation
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AllocationComponent;