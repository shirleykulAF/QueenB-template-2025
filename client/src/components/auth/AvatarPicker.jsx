import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  IconButton,
  Divider,
  Tooltip
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import { avatarOptions, defaultAvatar, generateCustomAvatar } from './avatarOptions';

const AvatarPicker = ({ selectedAvatar, onAvatarSelect, error, firstName = '', lastName = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [personalizedAvatars, setPersonalizedAvatars] = useState([]);

  // Generate personalized avatars when name changes
  useEffect(() => {
    if (firstName && lastName) {
      const personalized = avatarOptions.map(option => ({
        ...option,
        url: generateCustomAvatar(firstName, lastName, option.url.split('background=')[1].split('&')[0])
      }));
      setPersonalizedAvatars(personalized);
    } else {
      setPersonalizedAvatars(avatarOptions);
    }
  }, [firstName, lastName]);

  // Get current avatar URL (personalized if possible)
  const getCurrentAvatarUrl = () => {
    if (selectedAvatar && selectedAvatar !== defaultAvatar) {
      return selectedAvatar;
    }
    if (firstName && lastName) {
      return generateCustomAvatar(firstName, lastName);
    }
    return defaultAvatar;
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
        Profile Picture
      </Typography>

      {/* Selected Avatar Display */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Box sx={{ position: 'relative' }}>
          <Avatar
            src={getCurrentAvatarUrl()}
            alt="Selected avatar"
            sx={{
              width: 80,
              height: 80,
              border: '3px solid',
              borderColor: 'primary.light',
              boxShadow: 2
            }}
          />
          <IconButton
            onClick={() => setIsOpen(!isOpen)}
            sx={{
              position: 'absolute',
              bottom: -8,
              right: -8,
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': { bgcolor: 'primary.dark' },
              boxShadow: 2
            }}
            size="small"
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            color="primary"
            sx={{ textTransform: 'none', p: 0, minWidth: 'auto' }}
          >
            {isOpen ? 'Close Selection' : 'Choose Different Avatar'}
          </Button>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
            {firstName && lastName
              ? `Pick an avatar with your initials: ${firstName.charAt(0)}${lastName.charAt(0)}`
              : 'Pick an avatar that represents you'
            }
          </Typography>
        </Box>
      </Box>

      {/* Avatar Selection Grid */}
      {isOpen && (
        <Card sx={{ border: 1, borderColor: 'divider', boxShadow: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, textAlign: 'center' }}>
              🎨 Choose Your Avatar
            </Typography>

            <Grid container spacing={2} sx={{ maxHeight: 320, overflow: 'auto', mb: 2 }}>
              {personalizedAvatars.map((avatar) => (
                <Grid item xs={3} key={avatar.id}>
                  <Button
                    onClick={() => {
                      onAvatarSelect(avatar.url);
                      setIsOpen(false);
                    }}
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      border: 2,
                      borderColor: selectedAvatar === avatar.url ? 'primary.main' : 'divider',
                      bgcolor: selectedAvatar === avatar.url ? 'primary.50' : 'transparent',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: 2,
                        borderColor: 'primary.main',
                        bgcolor: 'primary.50'
                      },
                      transition: 'all 0.2s'
                    }}
                    fullWidth
                  >
                    <Box sx={{ textAlign: 'center' }}>
                      <Avatar
                        src={avatar.url}
                        alt={avatar.name}
                        sx={{ width: 64, height: 64, mx: 'auto', mb: 1 }}
                      />
                      <Typography variant="caption" sx={{ fontWeight: 500 }}>
                        {avatar.name}
                      </Typography>
                    </Box>
                  </Button>
                </Grid>
              ))}
            </Grid>

            <Divider sx={{ my: 2 }} />
            <Box sx={{ textAlign: 'center' }}>
              <Button
                onClick={() => {
                  const defaultUrl = firstName && lastName
                    ? generateCustomAvatar(firstName, lastName)
                    : defaultAvatar;
                  onAvatarSelect(defaultUrl);
                  setIsOpen(false);
                }}
                color="text.secondary"
                sx={{ textTransform: 'none' }}
              >
                ↺ Use default avatar
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Error Display */}
      {error && (
        <Typography color="error" variant="caption" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default AvatarPicker;
