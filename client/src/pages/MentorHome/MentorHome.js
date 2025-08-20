import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Avatar,
  Paper,
  Divider,
  IconButton,
  InputAdornment
} from '@mui/material';
import {
  PhotoCamera,
  Visibility,
  VisibilityOff,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';
import { useMentorData } from "../../hooks/useMentorData";
import { useMentorProfileForm } from "../../hooks/useMentorProfileForm";
import { useNavigate } from 'react-router-dom';
import "./MentorHome.css";

const MentorHome = ({ user }) => {
  const mentorId = user._id;
  const { mentor, loading, error } = useMentorData(mentorId);
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Use custom hook for form state management
  const {
    formData,
    passwordVisibility,
    handleInputChange,
    handlePasswordVisibility,
    resetForm
  } = useMentorProfileForm(user);

  const handleEditClick = () => {
    if (isEditMode) {
      // If already in edit mode, navigate to the edit page
      navigate('/mentor/edit', { state: { mentorData: user } });
    } else {
      // Enter edit mode
      setIsEditMode(true);
    }
  };

  const handleSaveClick = () => {
    // TODO: Implement save functionality
    console.log('Saving changes:', formData);
    setIsEditMode(false);
  };

  const handleCancelClick = () => {
    resetForm();
    setIsEditMode(false);
  };

  if (loading) return (
    <Box className="mentor-home-container loading">
      <Typography variant="h6">Loading...</Typography>
    </Box>
  );
  
  if (error) return (
    <Box className="mentor-home-container error">
      <Typography variant="h6">Error: {error.message}</Typography>
    </Box>
  );
  
  if (!mentor) return (
    <Box className="mentor-home-container error">
      <Typography variant="h6">No mentor data found</Typography>
    </Box>
  );

  const fullName = [mentor.firstName, mentor.lastName].filter(Boolean).join(" ");
  const profileImage = mentor.image || mentor.imageUrl;

  return (
    <Box className="mentor-home-container">
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Welcome, {fullName}!
      </Typography>

      <Grid container spacing={4}>
        {/* Left Column - Profile Photo, Upload, Password */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, height: 'fit-content' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                             {/* Profile Photo */}
               <Avatar
                 src={profileImage}
                 sx={{ width: 160, height: 160, fontSize: '4rem' }}
               >
                 {fullName.split(' ').map(name => name[0]).join('').toUpperCase() || '?'}
               </Avatar>
               
               {/* Upload Button - Only show in edit mode */}
               {isEditMode && (
                 <Button
                   variant="outlined"
                   component="label"
                   startIcon={<PhotoCamera />}
                   sx={{ mt: 1 }}
                 >
                   Upload Photo
                   <input hidden accept="image/*" type="file" />
                 </Button>
               )}

              {/* Change Password Section - Only show in edit mode */}
              {isEditMode && (
                <>
                  <Typography variant="h6" gutterBottom>
                    Change Password
                  </Typography>
                  
                  <TextField
                    fullWidth
                    label="Current Password"
                    type={passwordVisibility.current ? 'text' : 'password'}
                    value={formData.currentPassword}
                    onChange={handleInputChange('currentPassword')}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => handlePasswordVisibility('current')}
                            edge="end"
                          >
                            {passwordVisibility.current ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    fullWidth
                    label="New Password"
                    type={passwordVisibility.new ? 'text' : 'password'}
                    value={formData.newPassword}
                    onChange={handleInputChange('newPassword')}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => handlePasswordVisibility('new')}
                            edge="end"
                          >
                            {passwordVisibility.new ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    type={passwordVisibility.confirm ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleInputChange('confirmPassword')}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => handlePasswordVisibility('confirm')}
                            edge="end"
                          >
                            {passwordVisibility.confirm ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Right Column - Profile Information */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            {/* Profile Information Section */}
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Profile Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Username"
                      value={formData.username}
                      onChange={handleInputChange('username')}
                      InputProps={{
                        readOnly: !isEditMode,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange('firstName')}
                      InputProps={{
                        readOnly: !isEditMode,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange('lastName')}
                      InputProps={{
                        readOnly: !isEditMode,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Nickname"
                      value={formData.nickname}
                      onChange={handleInputChange('nickname')}
                      InputProps={{
                        readOnly: !isEditMode,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Display Name"
                      value={formData.displayName}
                      onChange={handleInputChange('displayName')}
                      InputProps={{
                        readOnly: !isEditMode,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Role"
                      value={formData.role}
                      onChange={handleInputChange('role')}
                      InputProps={{
                        readOnly: !isEditMode,
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Contact Information Section */}
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Contact Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange('email')}
                      InputProps={{
                        readOnly: !isEditMode,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone"
                      value={formData.phone}
                      onChange={handleInputChange('phone')}
                      InputProps={{
                        readOnly: !isEditMode,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="WhatsApp"
                      value={formData.whatsapp}
                      onChange={handleInputChange('whatsapp')}
                      InputProps={{
                        readOnly: !isEditMode,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="LinkedIn"
                      value={formData.linkedin}
                      onChange={handleInputChange('linkedin')}
                      InputProps={{
                        readOnly: !isEditMode,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Website"
                      value={formData.website}
                      onChange={handleInputChange('website')}
                      InputProps={{
                        readOnly: !isEditMode,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Telegram"
                      value={formData.telegram}
                      onChange={handleInputChange('telegram')}
                      InputProps={{
                        readOnly: !isEditMode,
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* About Section */}
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  About the User
                </Typography>
                <TextField
                  fullWidth
                  label="Biography / Description"
                  multiline
                  rows={4}
                  value={formData.biography}
                  onChange={handleInputChange('biography')}
                  placeholder="Tell us about yourself, your experience, and what you can offer as a mentor..."
                  InputProps={{
                    readOnly: !isEditMode,
                  }}
                />
              </Paper>
            </Grid>

            {/* Experience & Technologies Section */}
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Experience & Technologies
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Years of Experience"
                      type="number"
                      value={mentor.yearsOfExperience || ''}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Technologies"
                      value={mentor.technologies?.join(', ') || ''}
                      InputProps={{
                        readOnly: true,
                      }}
                      placeholder="Technologies will be displayed here"
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
        {!isEditMode ? (
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={handleEditClick}
            sx={{ px: 4, py: 1.5 }}
          >
            Edit Profile
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSaveClick}
              sx={{ px: 4, py: 1.5 }}
            >
              Save Changes
            </Button>
            <Button
              variant="outlined"
              startIcon={<CancelIcon />}
              onClick={handleCancelClick}
              sx={{ px: 4, py: 1.5 }}
            >
              Cancel
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default MentorHome;
