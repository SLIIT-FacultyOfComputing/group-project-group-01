import React, { useState } from 'react';

function Inventory() {
  const [activeDropdownId, setActiveDropdownId] = useState(null);

  const toggleOptions = (id) => {
    setActiveDropdownId(prevId => (prevId === id ? null : id));
  };

  const dummyData = [
    {
      id: 1,
      item: 'Mushroom seeds',
      recievedDate: '25/02/2025',
      recievedAmount: 1000,
      availabeAmount: 450,
    },
    {
      id: 2,
      item: 'Mushrooms',
      recievedDate: '25/02/2025',
      recievedAmount: 2000,
      availabeAmount: 120,
    },
  ];

  return (
    <div className="container bg-light-green py-4 background-gradient">
      <h2 className="text-white mb-4 text-center">Inventory</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-success text-center">
            <tr>
              <th>Id</th>
              <th>Item</th>
              <th>Recieved Date</th>
              <th>Recieved Amount</th>
              <th>Available Amount</th>
              <th>Stock Level</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((stock) => (
              <tr key={stock.id} className="text-center">
                <td>{stock.id}</td>
                <td>{stock.item}</td>
                <td>{stock.recievedDate}</td>
                <td>{stock.recievedAmount}</td>
                <td>{stock.availabeAmount}</td>
                <td>
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <button
                      className="btn dropdown-toggle"
                      style={{ backgroundColor: '#6fcf77', color: '#fff' }}
                      onClick={() => toggleOptions(stock.id)}
                    >
                      Stock Level
                    </button>
                    {activeDropdownId === stock.id && (
                      <div
                        className="mt-2 p-2 rounded shadow"
                        style={{
                          backgroundColor: '#f0fdf4',
                          color: '#1a3e2a',
                          border: '1px solid #6fcf77',
                          position: 'absolute',
                          zIndex: 100,
                          width: '150px',
                        }}
                      >
                        <div>In Stock</div>
                        <div>Low Stock</div>
                        <div>Out of Stock</div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;
