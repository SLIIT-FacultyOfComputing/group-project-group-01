import React from 'react';
import SalesChart from './SalesChart';
import LowStockAlerts from './LowStockAlerts';
import SalesTable from './SalesTable';
import { BarChart2 } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="container mt-5">
      <div className="d-flex align-items-center justify-content-center mb-4">
        <h2 className="text-success fw-bold d-flex align-items-center shadow-sm px-3 py-2 rounded">
          <BarChart2 className="me-2" size={28} />
          Admin Dashboard
        </h2>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <SalesChart />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <LowStockAlerts />
            </div>
          </div>
        </div>
      </div>


      {/* Sales Table */}
      <div className="card shadow-sm border-0 my-5">
        <div className="card-body">
          <SalesTable />
        </div>
      </div>
    </div>
  );
}
