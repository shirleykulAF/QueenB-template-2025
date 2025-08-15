import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline
} from "@mui/material";

import MentorList from "./pages/MenteeHome/MenteeHome";
import AuthPage from "./components/Login-Signup/AuthPage";
import NavBar from "./components/Layout/NavBar";

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

  const handleAuthSuccess = (userData) => {
    console.log('User authenticated:', userData);
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  // If user is not logged in, show auth page
  if (!user) {
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
      <Router>
        {/* Navigation Bar */}
        <NavBar user={user} onLogout={handleLogout} />

        <Routes>
          <Route path="/" element={<MentorList />} />
          {/* <Route path="/mentor-home" element={<MentorHome />} />
          <Route path="/mentors" element={<MentorList />} /> */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;