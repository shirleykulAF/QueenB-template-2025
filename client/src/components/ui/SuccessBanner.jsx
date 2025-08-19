import React from 'react';
import { Alert, Box, Typography, Button } from '@mui/material';
import { CheckCircle, Search } from '@mui/icons-material';

const SuccessBanner = ({ 
  title, 
  subtitle, 
  ctaLabel, 
  onCtaClick, 
  onClose,
  variant = 'default' // 'default', 'minimal', 'clean'
}) => {
  // Different success message variants - clean and professional
  const getSuccessContent = () => {
    switch (variant) {
      case 'minimal':
        return {
          icon: <CheckCircle fontSize="medium" sx={{ color: 'success.main' }} />,
          bgColor: 'success.light',
          borderColor: 'success.main',
          titleColor: 'success.dark'
        };
      case 'clean':
        return {
          icon: <CheckCircle fontSize="large" sx={{ color: 'success.main' }} />,
          bgColor: 'rgba(76, 175, 80, 0.08)',
          borderColor: 'success.main',
          titleColor: 'text.primary'
        };
      default:
        return {
          icon: <CheckCircle fontSize="large" sx={{ color: 'success.main' }} />,
          bgColor: 'rgba(76, 175, 80, 0.1)',
          borderColor: 'success.main',
          titleColor: 'text.primary'
        };
    }
  };

  const content = getSuccessContent();

  return (
    <Alert
      severity="success"
      icon={content.icon}
      onClose={onClose}
      sx={{
        mb: 3,
        p: 3,
        borderRadius: 2,
        border: `1px solid ${content.borderColor}`,
        backgroundColor: content.bgColor,
        '& .MuiAlert-message': { 
          width: '100%',
          color: 'text.primary'
        },
        '& .MuiAlert-icon': {
          color: 'success.main',
          fontSize: variant === 'minimal' ? '1.5rem' : '2rem'
        }
      }}
      aria-live="polite"
      role="alert"
    >
      <Box sx={{ width: '100%' }}>
        <Typography 
          variant="h5" 
          component="h2" 
          sx={{ 
            mb: 1.5, 
            fontWeight: 600,
            color: content.titleColor,
            textAlign: variant === 'minimal' ? 'left' : 'center'
          }}
        >
          {title}
        </Typography>
        
        <Typography 
          variant="body1" 
          sx={{ 
            mb: 2.5, 
            color: 'text.secondary',
            textAlign: variant === 'minimal' ? 'left' : 'center',
            fontSize: '1rem',
            lineHeight: 1.6
          }}
        >
          {subtitle}
        </Typography>
        
        {ctaLabel && onCtaClick && (
          <Box sx={{ 
            textAlign: variant === 'minimal' ? 'left' : 'center',
            mt: 2
          }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Search />}
              onClick={onCtaClick}
              sx={{ 
                fontWeight: 500,
                textTransform: 'none',
                px: 3,
                py: 1.2,
                fontSize: '0.95rem',
                borderRadius: 1.5,
                boxShadow: 1,
                '&:hover': {
                  boxShadow: 2,
                  transform: 'translateY(-1px)'
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              {ctaLabel}
            </Button>
          </Box>
        )}
      </Box>
    </Alert>
  );
};

export default SuccessBanner;
