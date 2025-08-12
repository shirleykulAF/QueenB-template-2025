import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Link as MuiLink
} from '@mui/material';
import { Login, Email, Lock } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleLoginChange = (e) => {
    setLoginData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLogin = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(loginData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: `Welcome back! Logged in as ${data.user.userType}` });

        // Redirect based on user type
        if (data.user.userType === 'mentor') {
          setTimeout(() => navigate('/profile/edit'), 1500);
        } else {
          setMessage({ type: 'info', text: 'Logged in as mentee. Only mentors can edit profiles.' });
        }
      } else {
        setMessage({ type: 'error', text: data.error || 'Login failed' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box bgcolor="background.default" minHeight="100vh" display="flex" alignItems="center" py={4}>
      <Container maxWidth="sm">
        <Paper elevation={8} sx={{ borderRadius: 3, overflow: 'hidden' }}>
          
          {/* Header */}
          <Box bgcolor="primary.main" color="primary.contrastText" p={4} textAlign="center">
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              👑 QueenB
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Mentorship Matching Platform
            </Typography>
          </Box>

          {/* Login Section */}
          <Box p={4}>
            <Typography variant="h5" textAlign="center" gutterBottom>
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
              Please log in to continue
            </Typography>

            {message.text && (
              <Alert 
                severity={message.type === 'success' ? 'success' : message.type === 'info' ? 'info' : 'error'}
                onClose={() => setMessage({ type: '', text: '' })}
                sx={{ mb: 3 }}
              >
                {message.text}
              </Alert>
            )}

            {/* Login Form */}
            <Box display="flex" flexDirection="column" gap={3}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
                InputProps={{
                  startAdornment: <Email sx={{ mr: 1, color: 'action.active' }} />
                }}
              />
              
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
                InputProps={{
                  startAdornment: <Lock sx={{ mr: 1, color: 'action.active' }} />
                }}
              />
              
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleLogin}
                disabled={loading || !loginData.email || !loginData.password}
                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Login />}
                sx={{ py: 1.5, fontSize: '1.1rem', mt: 1 }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </Box>

            {/* Sign Up Prompt */}
            <Box mt={4} textAlign="center">
              <Typography variant="body2" color="text.secondary">
                New here?{' '}
                <MuiLink 
                  component="button" 
                  variant="body2" 
                  onClick={() => navigate('/register')}
                  sx={{ fontWeight: 'bold' }}
                >
                  Create an account
                </MuiLink>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;
