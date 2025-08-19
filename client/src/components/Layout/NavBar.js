import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box
} from "@mui/material";

const NavBar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHome = () => {
    navigate('/');
  }

  const handleMenteeIndex = () => {
    navigate('/mentee-index');
  }

  const handleTips = () => {
    navigate('/tips');
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
            color="inherit" 
            onClick={handleHome}
            sx={{ 
              backgroundColor: location.pathname === '/' ? 'rgba(255,255,255,0.1)' : 'transparent',
              borderRadius: 1
            }}
          >
            Home
          </Button>
          <Button 
            color="inherit" 
            onClick={handleTips}
            sx={{ 
              backgroundColor: location.pathname === '/tips' ? 'rgba(255,255,255,0.1)' : 'transparent',
              borderRadius: 1
            }}
          >
            Tips
          </Button>
          { user?.userType === 'mentor' &&  (
            <Button 
              color='inherit' 
              onClick={handleMenteeIndex}
              sx={{ 
                backgroundColor: location.pathname === '/mentee-index' ? 'rgba(255,255,255,0.1)' : 'transparent',
                borderRadius: 1
              }}
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