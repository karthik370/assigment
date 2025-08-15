import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login as apiLogin, setToken } from '../api';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const LoginScreen = ({ setIsAuthenticated }) => {
  const { refreshEmployees } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await apiLogin(email, password);
      setToken(token);
      setIsAuthenticated(true);
      refreshEmployees();
      navigate('/dashboard');
    } catch (err) {
      alert(err.message || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-illustration">
          <div style={{
            width: '400px',
            height: '300px',
            background: '#f0f8ff',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            border: '2px solid #e1e8ed'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: '#4285f4',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
              marginBottom: '20px'
            }}>
              👤
            </div>
            <h3 style={{ color: '#4285f4', textAlign: 'center' }}>
              Welcome to HR SaaS
            </h3>
            <p style={{ color: '#666', textAlign: 'center', marginTop: '10px' }}>
              Manage your workforce efficiently
            </p>
          </div>
        </div>
      </div>
      <div className="login-right">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Sign In</h2>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Sign In
          </button>
          <div className="auth-link">
            <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
