import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Box,
  IconButton
} from '@mui/material';
import { ContentCopy, Close } from '@mui/icons-material';
import { copyToClipboard } from '../utils/contactUtils';

const ContactInfoDisplay = ({ open, onClose, type, value, mentorName }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTitle = () => {
    switch (type) {
      case 'email':
        return `${mentorName}'s Email`;
      case 'phone':
        return `${mentorName}'s Phone Number`;
      default:
        return 'Contact Information';
    }
  };



  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">{getTitle()}</Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Box 
          sx={{ 
            p: 2, 
            bgcolor: 'grey.50', 
            borderRadius: 1, 
            border: '1px solid',
            borderColor: 'grey.300',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography 
            variant="h6" 
            sx={{ 
              fontFamily: 'monospace',
              wordBreak: 'break-all'
            }}
          >
            {value}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<ContentCopy />}
            onClick={handleCopy}
            sx={{ ml: 2, minWidth: 'auto' }}
          >
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </Box>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContactInfoDisplay;
