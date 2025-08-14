import React from 'react';

const AuthToggle = ({ isLogin, setIsLogin }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      padding: '2rem 0',
      gap: '1rem'
    }}>
      <button 
        style={{
          padding: '0.75rem 1.5rem',
          border: `2px solid #86007C`,
          background: isLogin ? 'linear-gradient(135deg, #86007C 0%, #EFA1E2 100%)' : 'white',
          color: isLogin ? 'white' : '#86007C',
          borderRadius: '12px',
          cursor: 'pointer',
          fontWeight: 500,
          fontSize: '1rem',
          transition: 'all 0.3s ease',
          boxShadow: isLogin ? '0 4px 15px rgba(134, 0, 124, 0.3)' : '0 2px 8px rgba(134, 0, 124, 0.1)',
          transform: isLogin ? 'translateY(-2px)' : 'none'
        }}
        onClick={() => setIsLogin(true)}
      >
        Login
      </button>
      <button 
        style={{
          padding: '0.75rem 1.5rem',
          border: `2px solid #86007C`,
          background: !isLogin ? 'linear-gradient(135deg, #86007C 0%, #EFA1E2 100%)' : 'white',
          color: !isLogin ? 'white' : '#86007C',
          borderRadius: '12px',
          cursor: 'pointer',
          fontWeight: 500,
          fontSize: '1rem',
          transition: 'all 0.3s ease',
          boxShadow: !isLogin ? '0 4px 15px rgba(134, 0, 124, 0.3)' : '0 2px 8px rgba(134, 0, 124, 0.1)',
          transform: !isLogin ? 'translateY(-2px)' : 'none'
        }}
        onClick={() => setIsLogin(false)}
      >
        Sign Up
      </button>
    </div>
  );
};

export default AuthToggle;