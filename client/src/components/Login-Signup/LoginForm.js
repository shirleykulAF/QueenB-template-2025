import React, { useState } from 'react';
import './LoginForm.css';
import { useFormValidation }  from '../../hooks/useFormValidation';

const LoginForm = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { validateEmail } = useFormValidation();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required');
      return;
    }

    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    } 
    
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user)); 

        if (onSuccess) onSuccess(data.user);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred while logging in');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            required
            disabled={loading}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password</label >
          <div className='password-input-container'>
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
              required
              disabled={loading}
              minLength={6}
              placeholder='Enter your password'
            />
            <button
              type='button'
              className='password-toggle'
              onClick={() => setShowPassword(!showPassword)}
              disabled={loading}
              aria-label={showPassword ? "Hide password" : "Show password"}

            >
              {showPassword ? 'Hide' : 'Show'}
            </button>

          </div>

        </div>

        {error && <div className="error-message">{error}</div>}

        <button 
          type="submit" 
          disabled={loading}
          className="submit-button"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;