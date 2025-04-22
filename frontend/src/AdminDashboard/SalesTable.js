import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function SalesTable() {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/admin/overall-sales")
      .then((response) => {
        setSalesData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sales table data:", error);
      });
  }, []);

  const uniqueProductNames = [...new Set(salesData.flatMap(row =>
    Object.keys(row).filter(key => key !== "month")
  ))];

  return (
    <div className="bg-white shadow rounded-4 p-4 mx-auto mt-4" style={{ maxWidth: '1200px' }}>
      <h4 className="text-center text-primary mb-4 fw-semibold">Overall Sales by Product and Month</h4>

      {salesData.length > 0 ? (
        <div className="table-responsive">
          <table className="table sales-table align-middle text-center table-hover">
            <thead className="table-light">
              <tr>
                <th>Month</th>
                {uniqueProductNames.map(product => (
                  <th key={product}>{product}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {salesData.map((row, index) => (
                <tr key={index}>
                  <td className="fw-medium text-secondary">{row.month}</td>
                  {uniqueProductNames.map(product => (
                    <td key={product}>{row[product] || 0}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-muted">Loading sales data...</div>
      )}
    </div>
  );
}
