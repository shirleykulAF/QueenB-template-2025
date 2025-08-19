import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  Divider
} from '@mui/material';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleMentorLogin = () => {
    navigate('/login/mentor');
  };

  const handleMentorSignup = () => {
    navigate('/signup/mentor');
  };

  const handleMenteeLogin = () => {
    navigate('/login/mentee');
  };

  const handleMenteeSignup = () => {
    navigate('/signup/mentee');
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4
        }}
      >
        <Paper
          elevation={8}
          sx={{
            borderRadius: 4,
            p: 6,
            width: '100%',
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(252, 232, 214, 0.9) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          {/* Main Title */}
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              color: 'primary.main',
              fontWeight: 600,
              mb: 2
            }}
          >
            Welcome to QueenB
          </Typography>
          
          <Typography 
            variant="h5" 
            sx={{ 
              color: 'text.secondary',
              mb: 6,
              fontWeight: 400
            }}
          >
            Choose your role and get started
          </Typography>

          {/* Choice Buttons */}
          <Grid container spacing={4} justifyContent="center">
            {/* Mentor Section */}
            <Grid item xs={12} sm={6} md={5}>
              <Box sx={{ mb: 3 }}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: 'primary.main',
                    fontWeight: 600,
                    mb: 2
                  }}
                >
                  I'm a Mentor
                </Typography>
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 3,
                    color: 'text.secondary',
                    fontSize: '0.95rem'
                  }}
                >
                  Share your expertise and guide others
                </Typography>
              </Box>

              {/* Mentor Buttons */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleMentorSignup}
                  sx={{
                    py: 2,
                    px: 3,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #FF99AA 0%, #FFC0CB 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #FFC0CB 0%, #FF99AA 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 24px rgba(139, 107, 123, 0.3)',
                    }
                  }}
                >
                  Create Mentor Account
                </Button>

                <Button
                  variant="outlined"
                  size="medium"
                  fullWidth
                  onClick={handleMentorLogin}
                  sx={{
                    py: 1.5,
                    px: 3,
                    fontSize: '1rem',
                    fontWeight: 500,
                    borderRadius: 2,
                    borderColor: 'primary.main',
                    borderWidth: '2px',
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 153, 170, 0.08)',
                      borderColor: 'primary.dark',
                      transform: 'translateY(-1px)',
                    }
                  }}
                >
                  Already a Mentor? Login
                </Button>
              </Box>
            </Grid>

            {/* Divider */}
            <Grid item xs={12} sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Divider orientation="vertical" flexItem />
            </Grid>

            {/* Mentee Section */}
            <Grid item xs={12} sm={6} md={5}>
              <Box sx={{ mb: 3 }}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: 'primary.main',
                    fontWeight: 600,
                    mb: 2
                  }}
                >
                  I'm a Mentee
                </Typography>
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 3,
                    color: 'text.secondary',
                    fontSize: '0.95rem'
                  }}
                >
                  Find mentors and grow your skills
                </Typography>
              </Box>

              {/* Mentee Buttons */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleMenteeSignup}
                  sx={{
                    py: 2,
                    px: 3,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #8B6B7B 0%, #A67B8B 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #A67B8B 0%, #8B6B7B 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 24px rgba(139, 107, 123, 0.3)',
                    }
                  }}
                >
                  Create Mentee Account
                </Button>

                <Button
                  variant="outlined"
                  size="medium"
                  fullWidth
                  onClick={handleMenteeLogin}
                  sx={{
                    py: 1.5,
                    px: 3,
                    fontSize: '1rem',
                    fontWeight: 500,
                    borderRadius: 2,
                    borderColor: 'primary.main',
                    borderWidth: '2px',
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'rgba(139, 107, 123, 0.08)',
                      borderColor: 'primary.dark',
                      transform: 'translateY(-1px)',
                    }
                  }}
                >
                  Already a Mentee? Login
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default WelcomePage;
