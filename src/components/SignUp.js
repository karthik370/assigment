import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup as apiSignup, setToken } from '../api';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const SignUp = ({ setIsAuthenticated }) => {
  const { refreshEmployees } = useContext(AppContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    apiSignup(name, email, password)
      .then(({ token }) => {
        setToken(token);
        setIsAuthenticated(true);
        refreshEmployees();
        navigate('/dashboard');
      })
      .catch((err) => alert(err.message || 'Sign up failed'));
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-illustration" />
      </div>
      <div className="login-right">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Create Account</h2>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
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
              placeholder="Create a password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Sign Up
          </button>
          <div className="auth-link">
            <p>Already have an account? <Link to="/login">Sign in</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
