import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaBoxes } from 'react-icons/fa';

// Mock data (replace with real API calls when backend is ready)
let mockInventory = [
  { id: 1, material: "Polythene Bags", usageType: "lab", used_stock: 50 },
  { id: 2, material: "Cotton", usageType: "sales", used_stock: 120 }
];
let nextId = 3;

const mockApi = {
  getInventory: (usageType) => 
    new Promise(res => setTimeout(() => {
      const data = usageType ? 
        mockInventory.filter(i => i.usageType === usageType) : 
        mockInventory;
      res(data);
    }, 200)),
  saveInventory: (item) => 
    new Promise(res => {
      const newItem = { ...item, id: nextId++ };
      mockInventory.push(newItem);
      setTimeout(() => res(newItem), 200);
    }),
  updateInventory: (updated) => 
    new Promise(res => {
      mockInventory = mockInventory.map(i => i.id === updated.id ? updated : i);
      setTimeout(() => res(updated), 200);
    }),
  deleteInventory: (id) => 
    new Promise(res => {
      mockInventory = mockInventory.filter(i => i.id !== id);
      setTimeout(() => res(), 200);
    })
};

export default function InventoryManagement() {
  const location = useLocation();
  const navigate = useNavigate();
  const { InvId } = useParams();
  const [inventory, setInventory] = useState([]);
  const [currentItem, setCurrentItem] = useState({ 
    id: null, 
    material: "", 
    used_stock: "", 
    usageType: "lab" 
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  // Get usage type from URL path
  const usageType = location.pathname.split('/')[2] || 'all';

  useEffect(() => {
    loadInventory();
    if(InvId) loadItemForEdit();
  }, [usageType, InvId]);

  const loadInventory = async () => {
    setLoading(true);
    try {
      // const result = await axios.get(`/api/v2/getInvByUsage/${usageType}`);
      const data = await mockApi.getInventory(usageType === 'all' ? null : usageType);
      setInventory(data);
    } finally {
      setLoading(false);
    }
  };

  const loadItemForEdit = async () => {
    // const result = await axios.get(`/api/v2/getInv/${InvId}`);
    const item = mockInventory.find(i => i.id == InvId);
    if(item) setCurrentItem(item);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(currentItem.id) {
        // await axios.put("/api/v2/updateInv", currentItem);
        await mockApi.updateInventory(currentItem);
      } else {
        // await axios.post("/api/v2/saveInv", currentItem);
        await mockApi.saveInventory(currentItem);
      }
      resetForm();
      loadInventory();
      navigate('/inventory/all');
    } catch (error) {
      handleError(error);
    }
  };

  const deleteItem = async (id) => {
    if(window.confirm("Are you sure?")) {
      // await axios.delete(`/api/v2/deleteInv/${id}`);
      await mockApi.deleteInventory(id);
      loadInventory();
    }
  };

  const resetForm = () => {
    setCurrentItem({ id: null, material: "", used_stock: "", usageType: "lab" });
    navigate('/inventory/all');
  };

  const handleError = (error) => {
    const message = error?.response?.data?.message || "Something went wrong";
    if(message.includes("enough")) {
      alert(`⚠️ Warning: ${message}, Please check the stock amount.`);
    } else {
      alert(message);
    }
  };

  return (
    <div className="p-4">
      <div className="header-section p-4 mb-4 bg-light rounded-3 shadow-sm border-start border-4 border-success">
        <div className="d-flex align-items-center">
          <div className="icon-wrapper d-flex align-items-center justify-content-center rounded-circle bg-success bg-opacity-10 p-3 me-3">
            <FaBoxes className="text-success" style={{ fontSize: '1.8rem' }} />
          </div>
          <div>
            <h1 className="mb-1 fw-bold">Inventory Management</h1>
            <div className="d-flex gap-2 mt-2">
              <button 
                className={`btn btn-sm ${activeTab === 'all' ? 'btn-success' : 'btn-outline-success'}`}
                onClick={() => navigate('/inventory/all')}
              >
                All Inventory
              </button>
              <button 
                className={`btn btn-sm ${activeTab === 'lab' ? 'btn-success' : 'btn-outline-success'}`}
                onClick={() => navigate('/inventory/lab')}
              >
                Lab Inventory
              </button>
              <button 
                className={`btn btn-sm ${activeTab === 'sales' ? 'btn-success' : 'btn-outline-success'}`}
                onClick={() => navigate('/inventory/sales')}
              >
                Sales Inventory
              </button>
              <button 
                className={`btn btn-sm ${activeTab === 'other' ? 'btn-success' : 'btn-outline-success'}`}
                onClick={() => navigate('/inventory/other')}
              >
                Other Inventory
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm rounded-3 mb-4">
            <div className="card-body">
              <h5 className="card-title mb-3">
                {currentItem.id ? 'Edit Inventory' : 'Add New Inventory'}
              </h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Material Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="material"
                    value={currentItem.material}
                    onChange={(e) => setCurrentItem({...currentItem, material: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Stock Used</label>
                  <input
                    type="number"
                    className="form-control"
                    name="used_stock"
                    value={currentItem.used_stock}
                    onChange={(e) => setCurrentItem({...currentItem, used_stock: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Usage Type</label>
                  <select
                    className="form-select"
                    name="usageType"
                    value={currentItem.usageType}
                    onChange={(e) => setCurrentItem({...currentItem, usageType: e.target.value})}
                  >
                    <option value="lab">Lab</option>
                    <option value="sales">Sales</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-success">
                    {currentItem.id ? 'Update' : 'Create'}
                  </button>
                  {currentItem.id && (
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary" 
                      onClick={resetForm}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-3">
            <div className="card-header bg-white p-3 border-bottom border-light">
              <h5 className="mb-0 fw-bold text-success">
                {usageType === 'all' ? 'All Inventory' : `${usageType.charAt(0).toUpperCase() + usageType.slice(1)} Inventory`}
              </h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Material</th>
                      <th>Usage Type</th>
                      <th>Stock Used</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="5" className="text-center py-4">Loading...</td>
                      </tr>
                    ) : inventory.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-4">No inventory items found</td>
                      </tr>
                    ) : (
                      inventory.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.material}</td>
                          <td>{item.usageType}</td>
                          <td>{item.used_stock}</td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <button
                                className="btn btn-outline-primary"
                                onClick={() => navigate(`/inventory/edit/${item.id}`)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-outline-danger"
                                onClick={() => deleteItem(item.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
