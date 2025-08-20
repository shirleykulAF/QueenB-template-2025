import React, { useState } from 'react';
import LoginForm from './LoginForm';
import MenteeSignupForm from './MenteeSignupForm';
import MentorSignupForm from './MentorSignupForm';
import AuthToggle from './AuthToggle';

// Custom Logo Component
const CustomLogo = () => (
  <svg width="64" height="64" viewBox="0 0 32 32" style={{ marginBottom: '16px' }}>
    {/* Creamy beige circle */}
    <circle cx="16" cy="16" r="14" fill="#F5F1E8" stroke="#713062" strokeWidth="1"/>
    {/* Peach accent */}
    <path d="M8 16 Q16 8 24 16 Q16 24 8 16" fill="#FCDAC7"/>
    {/* Plum center */}
    <circle cx="16" cy="16" r="6" fill="#713062"/>
    {/* Crown icon in center */}
    <path d="M12 18 L16 14 L20 18 L18 20 L16 18 L14 20 Z" fill="#F5F1E8"/>
  </svg>
);

const AuthPage = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('mentee');
  
  return (
    <div style={{
      background: "#EAF5E0", // Light Green
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px"
    }}>
      {/* Logo */}
      <CustomLogo />
      
      {/* Slogan */}
      <div style={{
        textAlign: "center",
        marginBottom: "24px", // Changed to 24px for closer spacing
        maxWidth: "600px"
      }}>
        <h1 style={{
          color: "#1E3328", // Dark Forest
          fontSize: "32px",
          fontWeight: 700,
          marginBottom: "16px",
          fontFamily: '"Rubik", "Assistant", sans-serif'
        }}>
          HerCodeMatch
        </h1>
        <p style={{
          color: "#713062", // Plum
          fontSize: "24px", // Increased from 18px to 24px
          fontWeight: 600, // Increased from 500 to 600 for better emphasis
          lineHeight: 1.4, // Adjusted line height for larger text
          fontFamily: '"Rubik", "Assistant", sans-serif'
        }}>
          Support, Share, Succeed
        </p>
      </div>
      
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