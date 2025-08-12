import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline
} from "@mui/material";
// import Dashboard from "./components/Dashboard";
import MentorsListPage from "./pages/MentorsListPage";

const theme = createTheme({
  direction: "rtl",
  palette: {
    mode: "light",
    primary:   { main: "#f43f5e" },
    secondary: { main: "#fb7185" },
    background:{ default: "#fff5f7" }
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: '"Heebo", "Roboto", Arial, sans-serif',
    h4: { fontWeight: 900 },
    h6: { fontWeight: 700 }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: 16, boxShadow: "0 4px 14px rgba(0,0,0,.08)" }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 12 }
      }
    }
  }
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<MentorsListPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
