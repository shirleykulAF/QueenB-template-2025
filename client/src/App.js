import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";

import { theme } from "./theme";
import { useAuth } from "./hooks/useAuth";
import AuthPage from "./components/Login-Signup/AuthPage";
import AppLayout from "./components/Layout/AppLayout";

function App() {
  const { 
    user, 
    isLoading, 
    handleAuthSuccess, 
    handleLogout, 
    isAuthenticated 
  } = useAuth();

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}>
          טוען...
        </div>
      </ThemeProvider>
    );
  }

  // If user is not logged in, show auth page
  if (!isAuthenticated) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthPage onAuthSuccess={handleAuthSuccess} />
      </ThemeProvider>
    );
  }

  // If user is logged in, show the main app
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppLayout user={user} onLogout={handleLogout} />
    </ThemeProvider>
  );
}

export default App;