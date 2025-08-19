import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Paper,
  Autocomplete,
  Chip
} from '@mui/material';

const MenteeSignupPage = () => {
  const navigate = useNavigate();
  
  // Form state - following your database schema
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    description: '',
    lookingFor: [] // Array of technologies they want to learn
  });
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Available technologies for autocomplete (you can expand this list)
  const availableTechnologies = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'C#',
    'HTML', 'CSS', 'TypeScript', 'Angular', 'Vue.js', 'Django',
    'Express.js', 'MongoDB', 'PostgreSQL', 'MySQL', 'AWS', 'Docker',
    'Kubernetes', 'Git', 'DevOps', 'Machine Learning', 'AI',
    'Data Science', 'Mobile Development', 'iOS', 'Android', 'Flutter'
  ];

  // Handle input changes for regular text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear any previous errors/success messages
    if (error) setError('');
    if (success) setSuccess('');
  };

  // Handle technology selection (autocomplete)
  const handleTechnologyChange = (event, newValue) => {
    setFormData(prev => ({
      ...prev,
      lookingFor: newValue
    }));
    if (error) setError('');
    if (success) setSuccess('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Validate required fields
      if (!formData.firstName || !formData.lastName || !formData.email || 
          !formData.password || !formData.phone) {
        setError('Please fill in all required fields');
        return;
      }

      // Create mentee data (following your database schema)
      const menteeData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email.toLowerCase(),
        password: formData.password,
        phone: formData.phone,
        description: formData.description || '',
        lookingFor: formData.lookingFor,
        profileCompleted: true,
        isActive: true
      };

      // Send POST request to create mentee
      const response = await fetch('/api/mentees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(menteeData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess('Mentee account created successfully!');
        // Redirect to mentors page after a short delay
        setTimeout(() => {
          navigate('/mentors');
        }, 1500);
      } else {
        setError(data.error || 'Failed to create mentee account');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Check if form is valid
  const isFormValid = formData.firstName && formData.lastName && 
                     formData.email && formData.password && formData.phone;

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
            maxWidth: 600,
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(252, 232, 214, 0.9) 100%)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h3" 
              component="h1" 
              sx={{ 
                color: 'primary.main',
                fontWeight: 600,
                mb: 1
              }}
            >
              Create Mentee Account
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'text.secondary',
                fontSize: '1.1rem'
              }}
            >
              Join QueenB and find your perfect mentor
            </Typography>
          </Box>

          {/* Success Message */}
          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}

          {/* Error Message */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Sign-up Form */}
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 3 }}>
              {/* First Name and Last Name - Side by Side */}
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  fullWidth
                  label="First Name *"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  sx={{ flex: 1 }}
                />
                
                <TextField
                  fullWidth
                  label="Last Name *"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  sx={{ flex: 1 }}
                />
              </Box>

              {/* Email */}
              <TextField
                fullWidth
                label="Email *"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                sx={{ mb: 2 }}
                helperText="We'll use this for your login"
              />

              {/* Password */}
              <TextField
                fullWidth
                label="Password *"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                sx={{ mb: 2 }}
                helperText="Minimum 6 characters"
              />

              {/* Phone */}
              <TextField
                fullWidth
                label="Phone Number *"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                sx={{ mb: 2 }}
                helperText="Format: 050-1234567"
              />

              {/* Description */}
              <TextField
                fullWidth
                label="About You (Optional)"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                multiline
                rows={3}
                sx={{ mb: 2 }}
                helperText="Tell us what you're looking to learn"
              />

              {/* Technologies Autocomplete */}
              <Autocomplete
                multiple
                options={availableTechnologies}
                value={formData.lookingFor}
                onChange={handleTechnologyChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Technologies You Want to Learn *"
                    placeholder="Start typing..."
                    helperText="Select the technologies you want to learn"
                  />
                )}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      label={option}
                      {...getTagProps({ index })}
                      sx={{
                        backgroundColor: 'primary.light',
                        color: 'white',
                        '& .MuiChip-deleteIcon': {
                          color: 'white',
                        }
                      }}
                    />
                  ))
                }
                sx={{ mb: 3 }}
              />
            </Box>

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={!isFormValid || isLoading}
              sx={{
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Create Account'
              )}
            </Button>

            {/* Back to Login */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button
                color="primary"
                onClick={() => navigate('/login/mentee')}
                sx={{ 
                  textTransform: 'none',
                  fontWeight: 600,
                  p: 0,
                  minWidth: 'auto'
                }}
              >
                ← Back to Login
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default MenteeSignupPage;
