import React, { useState } from 'react';
import LoginForm from './LoginForm';
import MenteeSignupForm from './MenteeSignupForm';
import MentorSignupForm from './MentorSignupForm';
import AuthToggle from './AuthToggle';

const AuthPage = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('mentee');
  
  return (
    <div style={{
      background: "linear-gradient(135deg, #FBF4D7 0%, #EFA1E2 100%)",
      minHeight: "100vh"
    }}>
      <AuthToggle 
        isLogin={isLogin} 
        setIsLogin={setIsLogin}
        userType={userType}
        setUserType={setUserType} 
      />
      {isLogin ? (
        <LoginForm onSuccess={onAuthSuccess} />
      ) : (
        <>
          {!isLogin && userType === 'mentee' && <MenteeSignupForm onSuccess={onAuthSuccess} />}
          {!isLogin && userType === 'mentor' && <MentorSignupForm onSuccess={onAuthSuccess} />}
        </>
      )}
    </div>
  );
};

export default AuthPage;