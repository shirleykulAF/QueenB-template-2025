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
  Tabs,
  Tab,
  Grid,
  Link as MuiLink
} from '@mui/material';
import {
  Login,
  PersonAdd,
  Email,
  Lock,
  Person,
  Phone
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import MentorSignUp from './MentorSignUp'; // Import the MentorSignUp component

const LoginPage = () => {
  const [tabValue, setTabValue] = useState(0); // 0 = Login, 1 = Register
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Registration form state
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: ''
  });

  const handleLoginChange = (e) => {
    setLoginData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRegisterChange = (e) => {
    setRegisterData(prev => ({
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
        headers: {
          'Content-Type': 'application/json',
        },
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

  const handleRegister = async () => {
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Create FormData for mentor registration (since it expects multipart/form-data)
      const formData = new FormData();
      formData.append('email', registerData.email);
      formData.append('password', registerData.password);
      formData.append('firstName', registerData.firstName);
      formData.append('lastName', registerData.lastName);
      formData.append('phoneNumber', registerData.phoneNumber);
      formData.append('programmingLanguages', 'JavaScript');
      formData.append('technologies', 'React');
      formData.append('domains', 'Web Development');
      formData.append('yearsOfExperience', '1');
      formData.append('generalDescription', 'New mentor profile - please update');
      
      // Create a dummy profile photo (1x1 pixel image)
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      canvas.toBlob((blob) => {
        formData.append('profilePhoto', blob, 'profile.png');
        
        // Make the API call
        fetch('/api/auth/register-mentor', {
          method: 'POST',
          credentials: 'include',
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          if (data.user) {
            setMessage({ type: 'success', text: 'Mentor account created successfully! Redirecting to profile...' });
            setTimeout(() => navigate('/profile/edit'), 2000);
          } else {
            setMessage({ type: 'error', text: data.error || 'Registration failed' });
          }
          setLoading(false);
        })
        .catch(error => {
          setMessage({ type: 'error', text: 'Network error. Please try again.' });
          setLoading(false);
        });
      }, 'image/png');
      
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setMessage({ type: '', text: '' });
  };

  return (
    <Box 
      bgcolor="background.default" 
      minHeight="100vh" 
      display="flex" 
      alignItems="center"
      py={4}
    >
      <Container maxWidth="sm">
        <Paper elevation={8} sx={{ borderRadius: 3, overflow: 'hidden' }}>
          {/* Header */}
          <Box 
            bgcolor="primary.main" 
            color="primary.contrastText" 
            p={3}
            textAlign="center"
          >
            <Typography variant="h4" gutterBottom>
              👑 QueenB
            </Typography>
            <Typography variant="body1" opacity={0.9}>
              Mentorship Matching Platform
            </Typography>
          </Box>

          <Box p={3}>
            {/* Tabs */}
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              centered
              sx={{ mb: 3 }}
            >
              <Tab label="Login" icon={<Login />} />
              <Tab label="Register as Mentor" icon={<PersonAdd />} />
              <Tab label="Register as Mentee" icon={<PersonAdd />} />

            </Tabs>

            {/* Alert Messages */}
            {message.text && (
              <Alert 
                severity={message.type === 'success' ? 'success' : message.type === 'info' ? 'info' : 'error'}
                onClose={() => setMessage({ type: '', text: '' })}
                sx={{ mb: 3 }}
              >
                {message.text}
              </Alert>
            )}

            {/* Login Tab */}
            {tabValue === 0 && (
              <Box>
                <Typography variant="h6" gutterBottom textAlign="center" mb={3}>
                  Sign in to your account
                </Typography>
                
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
                    sx={{ 
                      py: 1.5,
                      fontSize: '1.1rem',
                      mt: 2
                    }}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </Box>

                {/* Quick test credentials */}
                <Box mt={3} p={2} bgcolor="grey.50" borderRadius={2}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Quick Test:</strong> Create a mentor account using the Register tab, then login here.
                  </Typography>
                </Box>
              </Box>
            )}

            {/* Register Tab */}
            {tabValue === 1 && <MentorSignUp/>}

            {/* Footer */}
            <Box textAlign="center" mt={4}>
              <Typography variant="body2" color="text.secondary">
                After login, mentors can access the profile update page
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage;