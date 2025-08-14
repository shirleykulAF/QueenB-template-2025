import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box
} from "@mui/material";

import MentorList from "./pages/MentorList/MentorList";
import SignupForm from "./components/Login-Signup/SignupForm";
import LoginForm from "./components/Login-Signup/LoginForm";

const theme = createTheme({
  palette: {
    primary: {
      main: "#86007C",
      light: "#EFA1E2",
      dark: "#4D3A4D",
    },
    secondary: {
      main: "#EFA1E2",
      light: "#FBF4D7",
      dark: "#86007C",
    },
    background: {
      default: "#FBF4D7",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#4D3A4D",
      secondary: "#86007C",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h4: {
      fontWeight: 600,
      color: "#4D3A4D",
    },
    h6: {
      fontWeight: 500,
      color: "#4D3A4D",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "linear-gradient(135deg, #86007C 0%, #EFA1E2 100%)",
          boxShadow: "0 4px 20px rgba(134, 0, 124, 0.3)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 500,
        },
        contained: {
          background: "linear-gradient(135deg, #86007C 0%, #EFA1E2 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #4D3A4D 0%, #86007C 100%)",
          },
        },
      },
    },
  },
});

function App() {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  const handleAuthSuccess = (userData) => {
    console.log('User authenticated:', userData);
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLogin(true);
  };

  // Auth toggle component
  const AuthToggle = () => (
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

  // If user is not logged in, show auth page
  if (!user) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{
          background: "linear-gradient(135deg, #FBF4D7 0%, #EFA1E2 100%)",
          minHeight: "100vh"
        }}>
          <AuthToggle />
          {isLogin ? (
            <LoginForm onSuccess={handleAuthSuccess} />
          ) : (
            <SignupForm onSuccess={handleAuthSuccess} />
          )}
        </div>
      </ThemeProvider>
    );
  }

  // If user is logged in, show the main app
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* Navigation Bar */}
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              QueenB Platform
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body1">
                Welcome, {user.firstName} {user.lastName}
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<MentorList />} />
          <Route path="/mentors" element={<MentorList />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;