import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box
} from "@mui/material";

// Custom Logo Component
const CustomLogo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" style={{ marginRight: '8px' }}>
    {/* Creamy beige circle */}
    <circle cx="16" cy="16" r="14" fill="#F5F1E8" stroke="#713062" strokeWidth="1"/>
    {/* Peach accent */}
    <path d="M8 16 Q16 8 24 16 Q16 24 8 16" fill="#FCDAC7"/>
    {/* Plum center */}
    <circle cx="16" cy="16" r="6" fill="#713062"/>
    {/* Crown icon in center */}
    <path d="M12 18 L16 14 L20 18 L18 20 L16 18 L14 20 Z" fill="#F5F1E8"/>
  </svg>
);

const NavBar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHome = () => {
    navigate('/');
  }

  const handleMenteeIndex = () => {
    navigate('/mentees-index');
  }

  const handleTips = () => {
    navigate('/tips');
  }
   
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          {/* Custom Logo */}
          <CustomLogo />
          
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              color: '#1E3328', // Dark Forest
              fontWeight: 600,
              fontSize: '20px'
            }}
          >
            HerCodeMatch
          </Typography>
        </Box>

        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        
          <Typography 
            variant="body1"
            sx={{ 
              color: '#1E3328', // Dark Forest
              fontWeight: 500
            }}
          >
            Welcome, {user.firstName} {user.lastName}
          </Typography>
        
        </Box>
        
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

          <Button 
            onClick={handleHome}
            sx={{
              marginLeft: 3, // או ml: 3
              backgroundColor: location.pathname === '/' ? '#713062' : 'transparent',
              color: location.pathname === '/' ? '#FFFFFF' : '#1E3328',
              borderRadius: 2,
              px: 2,
              py: 1,
              '&:hover': {
                backgroundColor: location.pathname === '/' ? '#1E3328' : 'rgba(30, 51, 40, 0.1)', // Changed from Coral to Dark Forest
                color: location.pathname === '/' ? '#FFFFFF' : '#1E3328', // Changed from Coral to Dark Forest
              }
            }}
          >
            Home
          </Button>
          <Button 
            onClick={handleTips}
            sx={{
              backgroundColor: '#f0ccbcd2',   
              color: '#1E3328',
              borderRadius: 2,
              px: 2,
              py: 1,
              '&:hover': {
                backgroundColor: '#f0ccbc',   
                color: '#1E3328',
              },
            }}
          >
            Tips
          </Button>
          { user?.userType === 'mentor' &&  (
            <Button 
              onClick={handleMenteeIndex}
              sx={{ 
                backgroundColor: location.pathname === '/mentee-index' ? '#713062' : 'transparent',
                color: location.pathname === '/mentee-index' ? '#FFFFFF' : '#1E3328',
                borderRadius: 2,
              px: 2,
              py: 1,
              '&:hover': {
                backgroundColor: location.pathname === '/mentee-index' ? '#1E3328' : 'rgba(30, 51, 40, 0.1)', // Changed from Coral to Dark Forest
                color: location.pathname === '/mentee-index' ? '#FFFFFF' : '#1E3328', // Changed from Coral to Dark Forest
              }
            }}
            >  
              Mentees Index
            </Button>
          )}
          <Button 
            onClick={onLogout}
            sx={{ 
              backgroundColor: '#1E3328', // Dark Forest (changed from Coral)
              color: '#FFFFFF',
              borderRadius: 2,
              px: 2,
              py: 1,
              '&:hover': {
                backgroundColor: '#713062', // Plum
                transform: 'translateY(-1px)',
              }
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;