import React from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  LinearProgress,
  Fade,
  Zoom
} from '@mui/material';
import {
  CheckCircle,
  RadioButtonUnchecked,
  Security
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Custom styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  background: 'linear-gradient(145deg, #f8fafc 0%, #e2e8f0 100%)',
  border: '1px solid #e2e8f0',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
  backdropFilter: 'blur(10px)',
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const StyledChip = styled(Chip)(({ strength }) => ({
  fontWeight: 'bold',
  textTransform: 'uppercase',
  fontSize: '0.7rem',
  ...(strength === 'weak' && {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    border: '1px solid #fecaca'
  }),
  ...(strength === 'medium' && {
    backgroundColor: '#fef3c7',
    color: '#d97706',
    border: '1px solid #fed7aa'
  }),
  ...(strength === 'strong' && {
    backgroundColor: '#dcfce7',
    color: '#16a34a',
    border: '1px solid #bbf7d0'
  })
}));

const StyledLinearProgress = styled(LinearProgress)(({ strength }) => ({
  height: 6,
  borderRadius: 3,
  backgroundColor: '#e2e8f0',
  '& .MuiLinearProgress-bar': {
    borderRadius: 3,
    ...(strength === 'weak' && {
      backgroundColor: '#dc2626'
    }),
    ...(strength === 'medium' && {
      backgroundColor: '#d97706'
    }),
    ...(strength === 'strong' && {
      backgroundColor: '#16a34a'
    })
  }
}));

const PasswordRequirementsBubble = ({ password }) => {
  if (!password) return null;

  const requirements = [
    { 
      test: password.length >= 8, 
      text: "At least 8 characters",
      icon: password.length >= 8 ? <CheckCircle color="success" /> : <RadioButtonUnchecked color="disabled" />
    },
    { 
      test: /[A-Z]/.test(password), 
      text: "One uppercase letter",
      icon: /[A-Z]/.test(password) ? <CheckCircle color="success" /> : <RadioButtonUnchecked color="disabled" />
    },
    { 
      test: /[a-z]/.test(password), 
      text: "One lowercase letter",
      icon: /[a-z]/.test(password) ? <CheckCircle color="success" /> : <RadioButtonUnchecked color="disabled" />
    },
    { 
      test: /\d/.test(password), 
      text: "One number",
      icon: /\d/.test(password) ? <CheckCircle color="success" /> : <RadioButtonUnchecked color="disabled" />
    },
    { 
      test: /[!@#$%^&*(),.?":{}|<>]/.test(password), 
      text: "One special character",
      icon: /[!@#$%^&*(),.?":{}|<>]/.test(password) ? <CheckCircle color="success" /> : <RadioButtonUnchecked color="disabled" />
    }
  ];

  const metRequirements = requirements.filter(req => req.test).length;
  const strength = metRequirements < 3 ? 'weak' : metRequirements < 5 ? 'medium' : 'strong';
  const strengthPercentage = (metRequirements / requirements.length) * 100;

  return (
    <Fade in={!!password} timeout={300}>
      <StyledPaper elevation={0}>
        {/* Header with icon and strength indicator */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Security sx={{ color: '#64748b', fontSize: 20 }} />
            <Typography variant="subtitle2" sx={{ color: '#475569', fontWeight: 600 }}>
              Password Strength
            </Typography>
          </Box>
          <Zoom in={!!password} timeout={300}>
            <StyledChip 
              label={strength} 
              size="small" 
              strength={strength}
              variant="outlined"
            />
          </Zoom>
        </Box>

        {/* Progress bar */}
        <Box sx={{ mb: 2 }}>
          <StyledLinearProgress 
            variant="determinate" 
            value={strengthPercentage}
            strength={strength}
          />
        </Box>

        {/* Requirements list */}
        <Typography variant="caption" sx={{ color: '#64748b', mb: 1, display: 'block' }}>
          Password must contain:
        </Typography>
        
        <List dense sx={{ p: 0 }}>
          {requirements.map((requirement, index) => (
            <Zoom 
              key={index} 
              in={!!password} 
              timeout={300 + (index * 100)}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <ListItem 
                sx={{ 
                  px: 0, 
                  py: 0.25,
                  opacity: requirement.test ? 1 : 0.6,
                  transition: 'opacity 0.3s ease'
                }}
              >
                <ListItemIcon sx={{ minWidth: 32 }}>
                  {requirement.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={requirement.text}
                  primaryTypographyProps={{
                    variant: 'body2',
                    sx: { 
                      fontSize: '0.8rem',
                      color: requirement.test ? '#16a34a' : '#64748b',
                      fontWeight: requirement.test ? 500 : 400,
                      transition: 'color 0.3s ease'
                    }
                  }}
                />
              </ListItem>
            </Zoom>
          ))}
        </List>
      </StyledPaper>
    </Fade>
  );
};

export default PasswordRequirementsBubble;