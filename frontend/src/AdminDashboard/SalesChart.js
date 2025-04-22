import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from 'recharts';

export default function SalesChart() {
  const [chartData, setChartData] = useState([]);
  const [lineKeys, setLineKeys] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/admin/sales-chart-grouped")
      .then((response) => {
        const data = response.data;

        const keys = new Set();
        data.forEach(entry => {
          Object.keys(entry).forEach(key => {
            if (key !== 'month') keys.add(key);
          });
        });

        setChartData(data);
        setLineKeys(Array.from(keys));
      })
      .catch((error) => {
        console.error("Error fetching grouped sales chart data:", error);
      });
  }, []);

  return (
    <div className="chart-wrapper bg-white shadow-lg rounded-3 p-4 mx-auto" style={{ maxWidth: '1200px' }}>
      <h4 className="text-center text-primary mb-4 fw-semibold"> Monthly Sales Performance</h4>

      <div style={{ width: '100%', height: 400 }}>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 40, left: 20, bottom: 50 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="month"
                angle={-45}
                textAnchor="end"
                interval={0}
                stroke="#333"
                height={60}
              />
              <YAxis stroke="#333" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #ccc',
                  borderRadius: '10px',
                  padding: '10px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              {lineKeys.map((key, index) => (
                <Line
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stroke={getColor(index)}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-muted">Loading chart data...</p>
        )}
      </div>
    </div>
  );
}

const getColor = (index) => {
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00c49f', '#ff69b4', '#a29bfe', '#fd79a8'];
  return colors[index % colors.length];
};
