import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { AppContext } from '../context/AppContext';

const AddNewEmployee = () => {
  const { addEmployee } = useContext(AppContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [department, setDepartment] = useState('Engineering');
  const [status, setStatus] = useState('Active');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = new Date();
    const joinedAt = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    try {
      await addEmployee({ name, email, role, department, status, joinedAt });
      navigate('/employees');
    } catch (err) {
      alert(err.message || 'Failed to save');
    }
  };

  return (
    <DashboardLayout title="Add Employee">
      <div className="add-employee-container">
        <form className="form-card" onSubmit={handleSubmit}>
          <h2>New Employee</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <input id="role" value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Frontend Developer" required />
            </div>
            <div className="form-group">
              <label htmlFor="department">Department</label>
              <select id="department" value={department} onChange={(e) => setDepartment(e.target.value)}>
                <option>Engineering</option>
                <option>Design</option>
                <option>HR</option>
                <option>Sales</option>
                <option>Marketing</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="btn-outline" onClick={() => navigate('/employees')}>Cancel</button>
            <button type="submit" className="btn-secondary">Save Employee</button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddNewEmployee;
