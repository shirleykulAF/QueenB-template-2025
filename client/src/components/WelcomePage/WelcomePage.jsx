import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid
} from '@mui/material';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleMentorChoice = () => {
    navigate('/login/mentor');
  };

  const handleMenteeChoice = () => {
    navigate('/login/mentee');
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
            Choose your role to get started
          </Typography>

          {/* Choice Buttons */}
          <Grid container spacing={4} justifyContent="center">
            {/* Mentor Choice */}
            <Grid item xs={12} sm={6} md={5}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handleMentorChoice}
                sx={{
                  py: 4,
                  px: 3,
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #FF99AA 0%, #FFC0CB 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #FFC0CB 0%, #FF99AA 100%)',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 32px rgba(139, 107, 123, 0.3)',
                  }
                }}
              >
                I'm a Mentor
              </Button>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  mt: 2, 
                  color: 'text.secondary',
                  fontSize: '0.95rem'
                }}
              >
                Share your expertise and guide others
              </Typography>
            </Grid>

            {/* Mentee Choice */}
            <Grid item xs={12} sm={6} md={5}>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                onClick={handleMenteeChoice}
                sx={{
                  py: 4,
                  px: 3,
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  borderRadius: 3,
                  borderColor: 'primary.main',
                  borderWidth: '2px',
                  color: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 153, 170, 0.08)',
                    borderColor: 'primary.dark',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 32px rgba(139, 107, 123, 0.2)',
                  }
                }}
              >
                I'm a Mentee
              </Button>
              
              <Typography 
                variant="body1" 
                sx={{ 
                  mt: 2, 
                  color: 'text.secondary',
                  fontSize: '0.95rem'
                }}
              >
                Find mentors and grow your skills
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default WelcomePage;
