import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../store/authSlice';

const LoginForm = ({ onSwitchToRegister }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-level validation on change
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (error) dispatch(clearError());
  };

  const validate = () => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email.';
    }
    if (!formData.password) {
      errors.password = 'Password is required.';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    dispatch(login(formData));
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <h2>Welcome Back</h2>
      <p className="subtitle">Sign in to your account</p>

      {error && <div className="error-banner">{error}</div>}

      <div className="form-group">
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          name="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          className={validationErrors.email ? 'input-error' : ''}
        />
        {validationErrors.email && (
          <span className="field-error">{validationErrors.email}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="login-password">Password</label>
        <div className="password-wrapper">
          <input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className={validationErrors.password ? 'input-error' : ''}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? '🙈' : '👁'}
          </button>
        </div>
        {validationErrors.password && (
          <span className="field-error">{validationErrors.password}</span>
        )}
      </div>

      <button type="submit" className="btn-primary">
        Sign In
      </button>

      <p className="switch-text">
        Don't have an account?{' '}
        <button type="button" className="link-btn" onClick={onSwitchToRegister}>
          Create one
        </button>
      </p>
    </form>
  );
};

export default LoginForm;
