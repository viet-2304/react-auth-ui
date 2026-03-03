import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../store/authSlice';

const RegisterForm = ({ onSwitchToLogin }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (error) dispatch(clearError());
  };

  const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { label: 'Weak', className: 'strength-weak' };
    if (score === 2) return { label: 'Fair', className: 'strength-fair' };
    if (score === 3) return { label: 'Good', className: 'strength-good' };
    return { label: 'Strong', className: 'strength-strong' };
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required.';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email.';
    }
    if (!formData.password) {
      errors.password = 'Password is required.';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters.';
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
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
    dispatch(register({ name: formData.name, email: formData.email, password: formData.password }));
  };

  const strength = formData.password ? getPasswordStrength(formData.password) : null;

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <h2>Create Account</h2>
      <p className="subtitle">Sign up to get started</p>

      {error && <div className="error-banner">{error}</div>}

      <div className="form-group">
        <label htmlFor="register-name">Full Name</label>
        <input
          id="register-name"
          type="text"
          name="name"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          className={validationErrors.name ? 'input-error' : ''}
        />
        {validationErrors.name && (
          <span className="field-error">{validationErrors.name}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
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
        <label htmlFor="register-password">Password</label>
        <div className="password-wrapper">
          <input
            id="register-password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Min. 8 characters"
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
        {strength && (
          <div className="password-strength">
            <div className={`strength-bar ${strength.className}`} />
            <span className={strength.className}>{strength.label}</span>
          </div>
        )}
        {validationErrors.password && (
          <span className="field-error">{validationErrors.password}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="register-confirm">Confirm Password</label>
        <input
          id="register-confirm"
          type={showPassword ? 'text' : 'password'}
          name="confirmPassword"
          placeholder="Re-enter your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={validationErrors.confirmPassword ? 'input-error' : ''}
        />
        {validationErrors.confirmPassword && (
          <span className="field-error">{validationErrors.confirmPassword}</span>
        )}
      </div>

      <button type="submit" className="btn-primary">
        Create Account
      </button>

      <p className="switch-text">
        Already have an account?{' '}
        <button type="button" className="link-btn" onClick={onSwitchToLogin}>
          Sign in
        </button>
      </p>
    </form>
  );
};

export default RegisterForm;
