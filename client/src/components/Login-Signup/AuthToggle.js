import React from 'react';
import './AuthToggle.css';

const AuthToggle = ({ isLogin, setIsLogin, userType, setUserType }) => {
  return (
    <div className="auth-toggle-container">
      {/* Login/Signup Buttons */}
      <div className="auth-mode-buttons">
        <button 
          className={`auth-mode-button ${isLogin ? 'active' : 'inactive'}`}
          onClick={() => setIsLogin(true)}
          aria-pressed={isLogin}
        >
          Login
        </button>
        <button 
          className={`auth-mode-button ${!isLogin ? 'active' : 'inactive'}`}
          onClick={() => setIsLogin(false)}
          aria-pressed={!isLogin}
        >
          Sign Up
        </button>
      </div>

      {/* User Type Selection - Only show when in signup mode */}
      {!isLogin && (
        <div className="user-type-selection">
          <div className="user-type-label">
            Choose your user type:
          </div>
          
          <div className={`user-type-buttons ${userType === 'mentee' ? 'mentee-selected' : 'mentor-selected'}`}>
            <button 
              className={`user-type-button ${userType === 'mentee' ? 'active' : ''}`}
              onClick={() => setUserType('mentee')}
              aria-pressed={userType === 'mentee'}
            >
              Mentee
            </button>
            <button 
              className={`user-type-button ${userType === 'mentor' ? 'active' : ''}`}
              onClick={() => setUserType('mentor')}
              aria-pressed={userType === 'mentor'}
            >
              Mentor
            </button>
          </div>
          
          {/* Optional: Step indicator */}
          <div className="auth-steps">
            <div className="auth-step completed"></div>
            <div className="auth-step active"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthToggle;