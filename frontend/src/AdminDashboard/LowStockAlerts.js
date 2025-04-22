import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function LowStockAlerts() {
  const [lowStockMaterials, setLowStockMaterials] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/admin/low-stock-alerts?threshold=20')
      .then(response => {
        setLowStockMaterials(response.data);
      })
      .catch(error => {
        console.error('Error fetching low stock materials:', error);
      });
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-3 p-4 mx-auto" style={{ maxWidth: '800px' }}>
      <h5 className="text-center text-danger mb-4 fw-semibold">Low Stock Alerts</h5>

      {lowStockMaterials.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead className="table-light">
              <tr>
                <th>Material</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {lowStockMaterials.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <span className="badge bg-warning text-dark d-flex align-items-center gap-2 px-2 py-1">
                      <span className="dot-indicator bg-danger rounded-circle" style={{ width: 10, height: 10 }}></span>
                      Low
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-muted">No Low Stock Alerts.</div>
      )}
    </div>
  );
}
