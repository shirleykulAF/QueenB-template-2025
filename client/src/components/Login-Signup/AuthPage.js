import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import AuthToggle from './AuthToggle';

const AuthPage = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div style={{
      background: "linear-gradient(135deg, #FBF4D7 0%, #EFA1E2 100%)",
      minHeight: "100vh"
    }}>
      <AuthToggle isLogin={isLogin} setIsLogin={setIsLogin} />
      {isLogin ? (
        <LoginForm onSuccess={onAuthSuccess} />
      ) : (
        <SignupForm onSuccess={onAuthSuccess} />
      )}
    </div>
  );
};

export default AuthPage;