import React from "react";
import MentorSignUp from "./components/mentorSignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline
} from "@mui/material";
import ProfileUpdate from './components/ProfileUpdate';
import LoginPage from './components/LoginPage'; // Add this import
import RegistrationPage from './components/RegistrationPage';


const theme = createTheme({
  palette: {
    primary: {
      main: "#6366f1",
    },
    secondary: {
      main: "#ec4899",
    },
    background: {
      default: "#f8fafc",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<MentorSignUp />} />
=======
          <Route path="/" element={<LoginPage />} /> {/* Changed this */}
          <Route path="/profile/edit" element={<ProfileUpdate />} />
          <Route path="/register" element={<RegistrationPage />} />

>>>>>>> origin/main
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;