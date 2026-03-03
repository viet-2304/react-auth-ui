import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="dashboard">
      <div className="dashboard-card">
        <div className="avatar">{user?.name?.charAt(0).toUpperCase()}</div>
        <h2>Welcome, {user?.name}!</h2>
        <p className="user-email">{user?.email}</p>
        <p className="dashboard-message">You're successfully logged in.</p>
        <button className="btn-logout" onClick={() => dispatch(logout())}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
