import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
  Alert,
  CircularProgress
} from '@mui/material';
import { ArrowBack as ArrowBackIcon, Email as EmailIcon } from '@mui/icons-material';
import authService from '../../services/authService';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await authService.forgotPassword(email);
      setMessage(response.message);
      
      // In development, show the reset token
      if (response.resetToken) {
        setResetToken(response.resetToken);
        setShowResetForm(true);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await authService.resetPassword(resetToken, newPassword);
      setMessage('Password reset successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #FCE8D6 0%, #FFC0CB 50%, #FF99AA 100%)', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      p: 2 
    }}>
      <Container maxWidth="sm">
        <Paper elevation={8} sx={{ 
          p: 6, 
          borderRadius: 4, 
          background: 'rgba(255, 255, 255, 0.95)', 
          backdropFilter: 'blur(10px)', 
          border: '1px solid rgba(255, 255, 255, 0.2)' 
        }}>
          <Box textAlign="center" mb={4}>
            <Typography variant="h4" gutterBottom sx={{ 
              fontWeight: 300, 
              background: 'linear-gradient(45deg, #FF99AA, #8B6B7B)', 
              backgroundClip: 'text', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent' 
            }}>
              {showResetForm ? 'Reset Password' : 'Forgot Password'}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ color: '#8B6B7B' }}>
              {showResetForm 
                ? 'Enter your new password below' 
                : 'Enter your email to receive a password reset link'
              }
            </Typography>
          </Box>

          {!showResetForm ? (
            // Forgot Password Form
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                required
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                InputProps={{
                  startAdornment: <EmailIcon sx={{ mr: 1, color: '#8B6B7B' }} />
                }}
              />

              {message && (
                <Alert severity="info" sx={{ mb: 3 }}>
                  {message}
                </Alert>
              )}

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 3 }}>
                <Button
                  variant="outlined"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => navigate('/login')}
                  sx={{ borderRadius: 2 }}
                >
                  Back to Login
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  sx={{ 
                    borderRadius: 2, 
                    background: 'linear-gradient(45deg, #FF99AA, #FF6B9D)', 
                    '&:hover': { background: 'linear-gradient(45deg, #FF6B9D, #FF99AA)' } 
                  }}
                >
                  {isLoading ? <CircularProgress size={24} /> : 'Send Reset Link'}
                </Button>
              </Box>
            </Box>
          ) : (
            // Reset Password Form
            <Box component="form" onSubmit={handleResetPassword}>
              <TextField
                required
                fullWidth
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                helperText="Password must be at least 8 characters long"
              />

              <TextField
                required
                fullWidth
                label="Confirm New Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />

              {message && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  {message}
                </Alert>
              )}

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 3 }}>
                <Button
                  variant="outlined"
                  onClick={() => setShowResetForm(false)}
                  sx={{ borderRadius: 2 }}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  sx={{ 
                    borderRadius: 2, 
                    background: 'linear-gradient(45deg, #FF99AA, #FF6B9D)', 
                    '&:hover': { background: 'linear-gradient(45deg, #FF6B9D, #FF99AA)' } 
                  }}
                >
                  {isLoading ? <CircularProgress size={24} /> : 'Reset Password'}
                </Button>
              </Box>
            </Box>
          )}

          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">
              Remember your password?{' '}
              <Button 
                color="primary" 
                onClick={() => navigate('/login')} 
                sx={{ textTransform: 'none' }}
              >
                Sign In
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ForgotPassword;
