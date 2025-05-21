import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

function BranchComponent() {
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [formData, setFormData] = useState({
        branchName: '',
        location: ''
    });

    useEffect(() => {
        fetchBranches();
    }, []);

    const fetchBranches = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('Attempting to fetch branches from:', `${API_BASE_URL}/branch`);
            
            const response = await axios.get(`${API_BASE_URL}/branch`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            
            console.log('Branches fetched successfully:', response.data);
            setBranches(response.data);
        } catch (err) {
            console.error('Error details:', {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status,
                config: err.config
            });

            let errorMessage = 'Failed to load branches. ';
            
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                errorMessage += `Server responded with status ${err.response.status}: ${err.response.data?.message || 'Unknown error'}`;
            } else if (err.request) {
                // The request was made but no response was received
                errorMessage += 'No response received from server. Please check if the server is running at ' + API_BASE_URL;
            } else {
                // Something happened in setting up the request that triggered an Error
                errorMessage += err.message;
            }
            
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const resetForm = () => {
        setFormData({
            branchName: '',
            location: ''
        });
    };

    const handleAddBranch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/branch`, formData);
            setBranches([...branches, response.data]);
            setShowAddForm(false);
            resetForm();
        } catch (err) {
            console.error('Error creating branch:', err);
            setError('Failed to create branch');
        }
    };

    const handleUpdateBranch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${API_BASE_URL}/branch/${selectedBranch.id}`, formData);
            setBranches(branches.map(branch => 
                branch.id === selectedBranch.id ? response.data : branch
            ));
            setShowUpdateForm(false);
            resetForm();
        } catch (err) {
            console.error('Error updating branch:', err);
            setError('Failed to update branch');
        }
    };

    const handleDeleteBranch = async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/branch/${id}`);
            setBranches(branches.filter(branch => branch.id !== id));
        } catch (err) {
            console.error('Error deleting branch:', err);
            setError('Failed to delete branch');
        }
    };

    const openAddModal = () => {
        resetForm();
        setShowAddForm(true);
    };

    const openUpdateModal = (branch) => {
        setSelectedBranch(branch);
        setFormData({
            branchName: branch.branchName,
            location: branch.location
        });
        setShowUpdateForm(true);
    };

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
                            fetchBranches();
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
            <h2 className="mb-4">Branches Management</h2>
            
            {/* Add Branch Button */}
            <div className="mb-3">
                <button 
                    className="btn btn-primary"
                    onClick={openAddModal}
                >
                    Add New Branch
                </button>
            </div>

            {/* Branches Table */}
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Branch Name</th>
                            <th>Location</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {branches.map((branch) => (
                            <tr key={branch.id}>
                                <td>{branch.id}</td>
                                <td>{branch.branchName}</td>
                                <td>{branch.location}</td>
                                <td>
                                    <button
                                        className="btn btn-info btn-sm me-2"
                                        onClick={() => openUpdateModal(branch)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDeleteBranch(branch.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Branch Modal */}
            {showAddForm && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Branch</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowAddForm(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleAddBranch}>
                                    <div className="mb-3">
                                        <label className="form-label">Branch Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="branchName"
                                            value={formData.branchName}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter branch name"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Location</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter branch location"
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
                                            Add Branch
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Update Branch Modal */}
            {showUpdateForm && (
                <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update Branch</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowUpdateForm(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleUpdateBranch}>
                                    <div className="mb-3">
                                        <label className="form-label">Branch Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="branchName"
                                            value={formData.branchName}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter branch name"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Location</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Enter branch location"
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
                                            Update Branch
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

export default BranchComponent; 