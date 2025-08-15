import React from 'react';
import { NavLink } from 'react-router-dom';
import { clearToken } from '../api';

const DashboardLayout = ({ title, children }) => {
  const onLogout = () => {
    clearToken();
    window.location.href = '/login';
  };
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <h3>InnoTech HR</h3>
        </div>
        <ul className="sidebar-nav">
          <li>
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : undefined)}>Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/employees" className={({ isActive }) => (isActive ? 'active' : undefined)}>Employees</NavLink>
          </li>
          <li>
            <NavLink to="/add-employee" className={({ isActive }) => (isActive ? 'active' : undefined)}>Add Employee</NavLink>
          </li>
        </ul>
      </aside>
      <main className="main-content">
        <div className="dashboard-header">
          <h1>{title}</h1>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p>HR management overview</p>
            <button className="btn-outline" onClick={onLogout}>Logout</button>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
