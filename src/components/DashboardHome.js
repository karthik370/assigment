import React, { useContext } from 'react';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import DashboardLayout from './DashboardLayout';
import { AppContext } from '../context/AppContext';

const DashboardHome = () => {
  const { stats } = useContext(AppContext);

  return (
    <DashboardLayout title="Dashboard">
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Employees</h3>
          <div className="stat-number">{stats.total}</div>
        </div>
        <div className="stat-card">
          <h3>Active</h3>
          <div className="stat-number">{stats.active}</div>
        </div>
        <div className="stat-card">
          <h3>Departments</h3>
          <div className="stat-number">{stats.deptCounts.reduce((s, d) => s + d.value, 0)}</div>
        </div>
      </div>

      <div className="chart-container">
        <h3>New Hires (Last 6 Months)</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={stats.byMonth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="hires" fill="#4285f4" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardLayout>
  );
};

export default DashboardHome;
