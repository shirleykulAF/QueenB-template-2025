import React, { useState, useEffect } from 'react';
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
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from '@mui/material';
import AvatarPicker from './AvatarPicker';
import { defaultAvatar } from './avatarOptions';
import { useFormValidation } from '../../hook/useFormValidation';
import SuccessBanner from '../ui/SuccessBanner';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WorkIcon from '@mui/icons-material/Work';
import LinkIcon from '@mui/icons-material/Link';

const MentorSignupPage = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    yearsOfExperience: '',
    expertise: [],
    description: '',
    availability: 'flexible',
    avatar: defaultAvatar, // Add default avatar
    linkedinUrl: '', // LinkedIn profile URL
    githubUrl: '', // GitHub profile URL
    websiteUrl: '', // Personal website URL
    twitterUrl: '' // Twitter/X profile URL
  });
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  
  // Use the reusable validation hook
  const {
    fieldErrors,
    generalError,
    success,
    clearErrors,
    clearFieldError,
    setFieldError,
    setError,
    setSuccessMessage,
    validateEmailField,
    validatePasswordField,
    validateRequiredField,
    validatePhoneField,
    hasErrors
  } = useFormValidation();

  // Available technologies for expertise (mentor's skills)
  const availableTechnologies = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'C#',
    'HTML', 'CSS', 'TypeScript', 'Angular', 'Vue.js', 'Django',
    'Express.js', 'MongoDB', 'PostgreSQL', 'MySQL', 'AWS', 'Docker',
    'Kubernetes', 'Git', 'DevOps', 'Machine Learning', 'AI',
    'Data Science', 'Mobile Development', 'iOS', 'Android', 'Flutter',
    'Ruby on Rails', 'PHP', 'Laravel', 'Swift', 'Kotlin', 'Rust',
    'Go', 'Scala', 'Elixir', 'GraphQL', 'REST APIs', 'Microservices'
  ];

  // Experience levels
  const experienceLevels = [
    '1-2 years', '3-5 years', '5-8 years', '8-12 years', '12+ years'
  ];

  // Availability options
  const availabilityOptions = [
    { value: 'part-time', label: 'Part-time (few hours/week)' },
    { value: 'full-time', label: 'Full-time (dedicated mentor)' },
    { value: 'flexible', label: 'Flexible (as needed)' }
  ];

  // Handle input changes for regular text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field-specific errors when user types
    if (fieldErrors[name]) {
      clearFieldError(name);
    }
    
    // Clear any previous general errors/success messages
    if (generalError) setError('');
    if (success) setSuccessMessage('');
    
    // Real-time validation for specific fields
    if (name === 'email' && value) {
      validateEmailField(value);
    }
    if (name === 'password' && value) {
      validatePasswordField(value);
    }
    if (name === 'phone' && value) {
      validatePhoneField(value);
    }
    if (name === 'linkedinUrl' && value) {
      validateLinkedInUrl(value);
    }
    if (name === 'githubUrl' && value) {
      validateGitHubUrl(value);
    }
    if (name === 'websiteUrl' && value) {
      validateWebsiteUrl(value);
    }
    if (name === 'twitterUrl' && value) {
      validateTwitterUrl(value);
    }
  };

  // Handle expertise selection (autocomplete)
  const handleExpertiseChange = (event, newValue) => {
    setFormData(prev => ({
      ...prev,
      expertise: newValue
    }));
    if (generalError) setError('');
    if (success) setSuccessMessage('');
  };

  // Handle avatar selection
  const handleAvatarSelect = (avatarUrl) => {
    setFormData(prev => ({
      ...prev,
      avatar: avatarUrl
    }));
    if (generalError) setError('');
    if (success) setSuccessMessage('');
  };

  // Validate LinkedIn URL
  const validateLinkedInUrl = (url) => {
    if (url && !url.match(/^https?:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/)) {
      setFieldError('linkedinUrl', 'Please enter a valid LinkedIn profile URL');
    } else {
      clearFieldError('linkedinUrl');
    }
  };

  // Validate GitHub URL
  const validateGitHubUrl = (url) => {
    if (url && !url.match(/^https?:\/\/(www\.)?github\.com\/[\w-]+\/?$/)) {
      setFieldError('githubUrl', 'Please enter a valid GitHub profile URL');
    } else {
      clearFieldError('githubUrl');
    }
  };

  // Validate website URL
  const validateWebsiteUrl = (url) => {
    if (url && !url.match(/^https?:\/\/.+/)) {
      setFieldError('websiteUrl', 'Please enter a valid website URL starting with http:// or https://');
    } else {
      clearFieldError('websiteUrl');
    }
  };

  // Validate Twitter/X URL
  const validateTwitterUrl = (url) => {
    if (url && !url.match(/^https?:\/\/(www\.)?(twitter\.com|x\.com)\/[\w-]+\/?$/)) {
      setFieldError('twitterUrl', 'Please enter a valid Twitter/X profile URL');
    } else {
      clearFieldError('twitterUrl');
    }
  };

  // Validate entire form before submission
  const validateForm = () => {
    let isValid = true;
    
    // Validate all required fields
    if (!validateRequiredField(formData.firstName, 'firstName')) isValid = false;
    if (!validateRequiredField(formData.lastName, 'lastName')) isValid = false;
    if (!validateEmailField(formData.email)) isValid = false;
    if (!validatePasswordField(formData.password)) isValid = false;
    if (!validatePhoneField(formData.phone)) isValid = false;
    if (!validateRequiredField(formData.yearsOfExperience, 'yearsOfExperience')) isValid = false;
    
    // Special validation for expertise array
    if (!formData.expertise || formData.expertise.length === 0) {
      setFieldError('expertise', 'Please select at least one area of expertise');
      isValid = false;
    } else {
      clearFieldError('expertise');
    }
    
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    clearErrors();

    try {
      // Create mentor data (following your database schema)
      const mentorData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email.toLowerCase(),
        password: formData.password,
        phone: formData.phone,
        yearsOfExperience: parseInt(formData.yearsOfExperience.split('-')[0]), // Convert "1-2 years" to 1
        technologies: formData.expertise, // Map expertise to technologies
        description: formData.description || '',
        availability: 'available', // Map to valid enum value
        profileImage: formData.avatar, // Add the selected avatar
        linkedinUrl: formData.linkedinUrl || undefined, // LinkedIn URL
        githubUrl: formData.githubUrl || undefined, // GitHub URL
        websiteUrl: formData.websiteUrl || undefined, // Personal website
        twitterUrl: formData.twitterUrl || undefined, // Twitter/X URL
        profileCompleted: true,
        isActive: true
      };

      // Send POST request to create mentor
      const response = await fetch('/api/mentors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mentorData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Show success banner
        setShowSuccessBanner(true);
        
        // Redirect to mentors page after delay to show the banner
        setTimeout(() => {
          navigate('/mentors?signupSuccess=1');
        }, 3000);
      } else {
        // Log the full server response for debugging
        console.log('Server Error Response:', {
          status: response.status,
          statusText: response.statusText,
          data: data,
          formData: mentorData
        });
        
        // Handle field-specific errors from server
        if (data.fieldErrors) {
          Object.keys(data.fieldErrors).forEach(field => {
            setFieldError(field, data.fieldErrors[field]);
          });
        } else {
          setError(data.error || data.message || 'Failed to create mentor account');
        }
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Check if form is valid for submit button
  const isFormValid = () => {
    // Check all required fields are filled
    const hasRequiredFields = 
      formData.firstName.trim() && 
      formData.lastName.trim() && 
      formData.email.trim() && 
      formData.password.length >= 6 && 
      formData.phone.trim() && 
      formData.yearsOfExperience && 
      formData.expertise.length > 0;
    
    // Check no field errors exist
    const hasNoFieldErrors = 
      !fieldErrors.firstName && 
      !fieldErrors.lastName && 
      !fieldErrors.email && 
      !fieldErrors.password && 
      !fieldErrors.phone && 
      !fieldErrors.yearsOfExperience && 
      !fieldErrors.expertise;
    
    // Check no general errors
    const hasNoGeneralErrors = !hasErrors();
    
    // If form is valid, clear any general errors
    if (hasRequiredFields && hasNoFieldErrors && generalError) {
      setError('');
    }
    
    // Debug logging
    console.log('Form Validation Debug:', {
      hasRequiredFields,
      hasNoFieldErrors,
      hasNoGeneralErrors,
      formData: {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        password: formData.password.length,
        phone: formData.phone.trim(),
        yearsOfExperience: formData.yearsOfExperience,
        expertise: formData.expertise,
        expertiseLength: formData.expertise.length
      },
      fieldErrors,
      generalError: generalError,
      expertiseCheck: formData.expertise.length > 0
    });
    
    return hasRequiredFields && hasNoFieldErrors && hasNoGeneralErrors;
  };

  // Handle success banner close
  const handleSuccessBannerClose = () => {
    setShowSuccessBanner(false);
  };

  // Handle immediate navigation to mentors
  const handleExploreMentors = () => {
    navigate('/mentors?signupSuccess=1');
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
              Become a Mentor
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'text.secondary',
                fontSize: '1.1rem'
              }}
            >
              Share your expertise and help others grow
            </Typography>
          </Box>

          {/* Success Banner */}
          {showSuccessBanner && (
            <SuccessBanner
              title="Welcome to QueenB, Mentor!"
              subtitle="You're now ready to help others grow and succeed. Your expertise will make a real difference in someone's learning journey."
              ctaLabel="View All Mentors"
              onCtaClick={handleExploreMentors}
              onClose={handleSuccessBannerClose}
              variant="clean"
            />
          )}

          {/* Error Message */}
          {generalError && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {generalError}
            </Alert>
          )}

          {/* Sign-up Form */}
          <form onSubmit={handleSubmit}>
            {/* Basic Information Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <PersonIcon className="text-pink-500 mr-2" />
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <TextField
                  name="firstName"
                  label="First Name *"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  error={!!fieldErrors.firstName}
                  helperText={fieldErrors.firstName}
                  fullWidth
                  required
                />
                
                {/* Last Name */}
                <TextField
                  name="lastName"
                  label="Last Name *"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={!!fieldErrors.lastName}
                  helperText={fieldErrors.lastName}
                  fullWidth
                  required
                />
                
                {/* Email */}
                <TextField
                  name="email"
                  label="Email Address *"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!fieldErrors.email}
                  helperText={fieldErrors.email}
                  fullWidth
                  required
                />
                
                {/* Password */}
                <TextField
                  name="password"
                  label="Password *"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={!!fieldErrors.password}
                  helperText={fieldErrors.password}
                  fullWidth
                  required
                />
                
                {/* Phone */}
                <TextField
                  name="phone"
                  label="Phone Number *"
                  value={formData.phone}
                  onChange={handleInputChange}
                  error={!!fieldErrors.phone}
                  helperText={fieldErrors.phone}
                  fullWidth
                  required
                />
              </div>
            </div>

            {/* Avatar Selection */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <AccountCircleIcon className="text-pink-500 mr-2" />
                Profile Picture
              </h3>
              <AvatarPicker
                selectedAvatar={formData.avatar}
                onAvatarSelect={handleAvatarSelect}
                error={fieldErrors.avatar}
                firstName={formData.firstName}
                lastName={formData.lastName}
              />
            </div>

            {/* Professional Information Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <WorkIcon className="text-pink-500 mr-2" />
                Professional Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Years of Experience */}
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Years of Experience *</InputLabel>
                  <Select
                    name="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={handleInputChange}
                    label="Years of Experience *"
                    required
                  >
                    {experienceLevels.map((level) => (
                      <MenuItem key={level} value={level}>
                        {level}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                {/* Expertise Areas */}
                <Autocomplete
                  multiple
                  options={availableTechnologies}
                  value={formData.expertise}
                  onChange={handleExpertiseChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Areas of Expertise *"
                      placeholder="Select your skills..."
                      helperText={fieldErrors.expertise || "Choose the technologies you're expert in"}
                      error={!!fieldErrors.expertise}
                    />
                  )}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => {
                      const { key, ...chipProps } = getTagProps({ index });
                      return (
                        <Chip
                          key={key}
                          label={option}
                          {...chipProps}
                          sx={{
                            backgroundColor: 'primary.light',
                            color: 'white',
                            '& .MuiChip-deleteIcon': {
                              color: 'white',
                            }
                          }}
                        />
                      );
                    })
                  }
                  sx={{ mb: 2 }}
                />

                {/* Availability */}
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Availability *</InputLabel>
                  <Select
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    label="Availability *"
                    required
                  >
                    {availabilityOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>

            {/* Description */}
            <TextField
              fullWidth
              label="About You & Your Mentoring Style"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={4}
              sx={{ mb: 3 }}
              helperText="Tell mentees about your experience and how you like to mentor in our free community"
            />

            {/* Contact Links Section */}
            <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 2, border: 1, borderColor: 'divider', mb: 3 }}>
              <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                <LinkIcon sx={{ color: 'primary.main', mr: 1 }} />
                Contact Links (Optional)
              </Typography>
              
              <Grid container spacing={2}>
                {/* LinkedIn */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="LinkedIn Profile"
                    name="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/yourprofile"
                    helperText="Your LinkedIn profile URL"
                  />
                </Grid>
                
                {/* GitHub */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="GitHub Profile"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleInputChange}
                    placeholder="https://github.com/yourusername"
                    helperText="Your GitHub profile URL"
                  />
                </Grid>
                
                {/* Personal Website */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Personal Website"
                    name="websiteUrl"
                    value={formData.websiteUrl}
                    onChange={handleInputChange}
                    placeholder="https://yourwebsite.com"
                    helperText="Your personal or portfolio website"
                  />
                </Grid>
                
                {/* Twitter/X */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Twitter/X Profile"
                    name="twitterUrl"
                    value={formData.twitterUrl}
                    onChange={handleInputChange}
                    placeholder="https://twitter.com/yourusername"
                    helperText="Your Twitter/X profile URL"
                  />
                </Grid>
              </Grid>
              
              <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                These links will be displayed on your mentor profile for mentees to contact you
              </Typography>
            </Box>

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={!isFormValid() || isLoading}
              sx={{
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Create Mentor Account'
              )}
            </Button>

            {/* Back to Login */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button
                color="primary"
                onClick={() => navigate('/login/mentor')}
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

export default MentorSignupPage;
