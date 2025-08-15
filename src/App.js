import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import SignUp from './components/SignUp';
import DashboardHome from './components/DashboardHome';
import EmployeeListPage from './components/EmployeeListPage';
import AddNewEmployee from './components/AddNewEmployee';
import './App.css';
import { getToken } from './api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  React.useEffect(() => {
    if (getToken()) setIsAuthenticated(true);
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={<LoginScreen setIsAuthenticated={setIsAuthenticated} />} 
          />
          <Route path="/signup" element={<SignUp setIsAuthenticated={setIsAuthenticated} />} />
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <DashboardHome /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/employees" 
            element={isAuthenticated ? <EmployeeListPage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/add-employee" 
            element={isAuthenticated ? <AddNewEmployee /> : <Navigate to="/login" />} 
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
