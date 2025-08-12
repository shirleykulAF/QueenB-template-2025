import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography
} from "@mui/material";
// import UserManagement from "./UserManagement"; // TODO delete
// import MentorList from "../pages/MentorList";
import MentorList from "../pages/MentorList/MentorList"; // Ensure this import matches your structure

function App() {
  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar 
          position="static" 
          elevation={2}
          sx={{
            background: 'linear-gradient(90deg, #86007C 0%, #4D3A4D 100%)',
            boxShadow: '0 4px 12px rgba(77, 58, 77, 0.3)'
          }}
        >
          <Toolbar>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                flexGrow: 1,
                color: '#FBF4D7',
                fontWeight: 600,
                letterSpacing: '0.5px'
              }}
            >
              👑 Queens Match
            </Typography>
          </Toolbar>
        </AppBar>
        {/* <UserManagement /> // TODO delete line*/}  
        <MentorList />
      </Box>
  );
}

export default App;
