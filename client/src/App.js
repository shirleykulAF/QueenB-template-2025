import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline
} from "@mui/material";

import MentorList from "./pages/MentorList/MentorList"; 
import MentorHome from "./pages/MentorHome/MentorHome"; 


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
          <Route path="/" element={<MentorList />} />
          <Route path="/mentor-home" element={<MentorHome />} />
          <Route path="/mentors" element={<MentorList />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
