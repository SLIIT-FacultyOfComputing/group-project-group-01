import React from 'react';
import SalesChart from './SalesChart';
import LowStockAlerts from './LowStockAlerts';
import { BarChart2, AlertTriangle, ClipboardList } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <h2 className="dashboard-title">
          <BarChart2 className="title-icon" size={28} />
          <span className="title-text">Admin Dashboard</span>
          <span className="title-decoration"></span>
        </h2>
      </div>

      {/* Dashboard Cards Grid */}
      <div className="dashboard-grid">
        {/* Sales Chart Card */}
        <div className="dashboard-card wide-card">
          <div className="card-header">
            <ClipboardList className="card-icon" size={20} />
            <h3 className="card-title">Sales Overview</h3>
          </div>
          <div className="card-body chart-container">
            <SalesChart />
          </div>
        </div>

        {/* Low Stock Alerts Card */}
        <div className="dashboard-card alert-card">
          <div className="card-header alert-header">
            <AlertTriangle className="card-icon" size={20} />
            <h3 className="card-title">Low Stock Alerts</h3>
          </div>
          <div className="card-body alerts-container">
            <LowStockAlerts />
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        :root {
          --primary-color: #1B9C85;
          --primary-light: rgba(27, 156, 133, 0.1);
          --primary-medium: rgba(27, 156, 133, 0.2);
          --secondary-color: #43A047;
          --accent-color: #6366F1;
          --warning-color: #F59E0B;
          --text-primary: #2D3748;
          --text-secondary: #4A5568;
          --background-light: #F7FAFC;
          --card-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
          --card-hover-shadow: 0 20px 35px -10px rgba(0, 0, 0, 0.1);
          --border-radius-sm: 8px;
          --border-radius-md: 12px;
          --border-radius-lg: 16px;
          --border-radius-xl: 24px;
          --transition-fast: 0.2s ease;
          --transition-normal: 0.3s ease;
          --transition-slow: 0.5s ease;
          --navbar-height: 64px;
          --sidebar-width: 240px;
          --card-height: 500px;
        }

        .dashboard-container {
          padding: 2rem;
          margin-left: var(--sidebar-width);
          padding-top: calc(var(--navbar-height) + 1rem);
          background-color: var(--background-light);
          min-height: 100vh;
          width: calc(100% - var(--sidebar-width));
          font-family: 'Inter', sans-serif;
          color: var(--text-primary);
          box-sizing: border-box;
          overflow-x: hidden;
          animation: fadeIn 0.6s var(--transition-normal);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .dashboard-header {
          margin-bottom: 2rem;
          text-align: center;
        }

        .dashboard-title {
          display: inline-flex;
          align-items: center;
          padding: 0.75rem 2.5rem;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(27, 156, 133, 0.12));
          border-radius: var(--border-radius-xl);
          color: var(--accent-color);
          font-weight: 700;
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.12);
          border: 1px solid rgba(99, 102, 241, 0.15);
          transition: all var(--transition-normal);
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        @media (min-width: 992px) {
          .dashboard-grid {
            grid-template-columns: 2fr 1fr;
          }
        }

        .dashboard-card {
          background: white;
          border-radius: var(--border-radius-lg);
          box-shadow: var(--card-shadow);
          transition: all var(--transition-normal);
          border: 1px solid rgba(226, 232, 240, 0.8);
          height: var(--card-height);
          display: flex;
          flex-direction: column;
        }

        .card-header {
          padding: 1.5rem;
          border-bottom: 1px solid rgba(226, 232, 240, 0.8);
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .alert-header {
          background: linear-gradient(45deg, rgba(245, 158, 11, 0.05) 0%, rgba(245, 158, 11, 0.1) 100%);
          border-bottom: 1px solid rgba(245, 158, 11, 0.15);
        }

        .card-icon {
          margin-right: 0.85rem;
          color: var(--accent-color);
        }

        .alert-header .card-icon {
          color: var(--warning-color);
        }

        .card-title {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 600;
        }

        .card-body {
          flex-grow: 1;
          min-height: 0;
          overflow: hidden;
          padding: 0;
        }

        .alerts-container {
          height: 100%;
          position: relative;
        }

        .alerts-container > :global(div) {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        /* Scrollbar Styling */
        .alerts-container ::-webkit-scrollbar {
          width: 6px;
        }

        .alerts-container ::-webkit-scrollbar-track {
          background: rgba(245, 158, 11, 0.05);
          border-radius: 4px;
        }

        .alerts-container ::-webkit-scrollbar-thumb {
          background: rgba(245, 158, 11, 0.2);
          border-radius: 4px;
        }

        @media (max-width: 768px) {
          .dashboard-container {
            padding: 1rem;
            margin-left: 0;
            width: 100%;
          }

          .dashboard-grid {
            grid-template-columns: 1fr;
          }

          .dashboard-card {
            height: 450px;
          }
        }
      `}</style>
    </div>
  );
}