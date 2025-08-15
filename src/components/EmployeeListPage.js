import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { AppContext } from '../context/AppContext';

const EmployeeListPage = () => {
  const { employees } = useContext(AppContext);

  return (
    <DashboardLayout title="Employees">
      <div className="employee-list">
        <div className="employee-list-header">
          <h2>Employee Directory</h2>
          <Link to="/add-employee" className="btn-secondary">Add New</Link>
        </div>
        <table className="employee-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Department</th>
              <th>Status</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e) => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.role}</td>
                <td>{e.department}</td>
                <td>
                  <span className={`status-badge ${e.status === 'Active' ? 'status-active' : 'status-inactive'}`}>
                    {e.status}
                  </span>
                </td>
                <td>{new Date(e.joinedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeListPage;
