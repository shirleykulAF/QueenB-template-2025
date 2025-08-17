import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box
} from "@mui/material";

const NavBar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
  }

  const handleMenteeIndex = () => {
    navigate('/mentee-index');
  }
   
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          QueenB Mentorship Match
        </Typography>

        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        
          <Typography variant="body1">
            Welcome, {user.firstName} {user.lastName}
          </Typography>
        
        </Box>
        
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

          <Button 
            color="inherit" onClick={handleHome}>
            Home
          </Button>
          { user?.userType === 'mentor' &&  (
            <Button color='inherit' onClick={handleMenteeIndex}
            >  
              Mentees Index
            </Button>
          )}
          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;