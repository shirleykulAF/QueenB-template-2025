import { useState, useEffect } from "react";


export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load user from sessionStorage on initial render
  useEffect(() => {
    const savedUser = sessionStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        sessionStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);
  
  // Handle authentication success
  const handleAuthSuccess = (userData) => {
    console.log('User authenticated:', userData); 
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
  };

  // Handle logout

  const handleLogout = () => {
    window.location.href = '/'; // Redirect to home page  
    setUser(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('authToken');    
  };
  
  return {
    user,
    isLoading,
    handleAuthSuccess,
    handleLogout,
    isAuthenticated: !!user
  };
};