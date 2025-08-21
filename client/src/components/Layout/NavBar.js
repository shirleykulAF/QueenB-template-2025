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
    navigate('/mentees-index');
  }

  const handleMyMentor = () => {
    navigate('/my-mentor');
  }

  const handleTips = () => {
    navigate('/tips');
  }
   
  return (
    <AppBar position="static">
      <Toolbar>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            flexGrow: 1,
            cursor: 'pointer' 
          }}
          onClick={handleHome}
        >
          {/* Custom Logo */}
          <img
            src="../logo.png"
            alt="Butterfly Logo"
            style={{ width: '50px', height: '50px', marginRight: '0' }}
          />
          
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              color: '#1E3328', // Dark Forest
              fontWeight: 600,
              fontSize: '20px',
              '&:hover': {
                color: '#713062', // Plum color on hover
              },
              transition: 'color 0.3s'
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
          { user?.userType === 'mentee' &&  (
            <Button 
              onClick={handleMyMentor}
              sx={{ 
                backgroundColor: location.pathname === '/my-mentor' ? '#713062' : 'transparent',
                color: location.pathname === '/my-mentor' ? '#FFFFFF' : '#1E3328',
                borderRadius: 2,
              px: 2,
              py: 1,
              '&:hover': {
                backgroundColor: location.pathname === '/my-mentor' ? '#1E3328' : 'rgba(30, 51, 40, 0.1)', // Changed from Coral to Dark Forest
                color: location.pathname === '/my-mentor' ? '#FFFFFF' : '#1E3328', // Changed from Coral to Dark Forest
              }
            }}
            >  
              My Mentor
            </Button>
          )}
          <Button 
              onClick={handleTips}
              sx={{ 
                backgroundColor: location.pathname === '/tips' ? '#713062' : 'transparent',
                color: location.pathname === '/tips' ? '#FFFFFF' : '#1E3328',
                borderRadius: 2,
              px: 2,
              py: 1,
              '&:hover': {
                backgroundColor: location.pathname === '/tips' ? '#1E3328' : 'rgba(30, 51, 40, 0.1)', // Fixed path
                color: location.pathname === '/tips' ? '#FFFFFF' : '#1E3328', // Fixed path
              }
            }}
            >  
              Tips
            </Button>
          { user?.userType === 'mentor' &&  (
            <Button 
              onClick={handleMenteeIndex}
              sx={{ 
                backgroundColor: location.pathname === '/mentees-index' ? '#713062' : 'transparent',
                color: location.pathname === '/mentees-index' ? '#FFFFFF' : '#1E3328',
                borderRadius: 2,
              px: 2,
              py: 1,
              '&:hover': {
                backgroundColor: location.pathname === '/mentees-index' ? '#1E3328' : 'rgba(30, 51, 40, 0.1)', // Fixed path
                color: location.pathname === '/mentees-index' ? '#FFFFFF' : '#1E3328', // Fixed path
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