import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Dashboard from './Dashboard';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Dashboard />;
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Left panel — branding */}
        <div className="auth-branding">
          <div className="brand-content">
            <h1>MyApp</h1>
            <p>A simple React + Redux authentication UI demo with form validation, password strength meter, and state management.</p>
          </div>
        </div>

        {/* Right panel — forms */}
        <div className="auth-panel">
          <div className="tab-bar">
            <button
              className={`tab ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Sign In
            </button>
            <button
              className={`tab ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('register')}
            >
              Sign Up
            </button>
          </div>

          {activeTab === 'login' ? (
            <LoginForm onSwitchToRegister={() => setActiveTab('register')} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setActiveTab('login')} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
