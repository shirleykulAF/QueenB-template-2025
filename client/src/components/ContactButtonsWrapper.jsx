import React, { useState } from 'react';
import { Button } from '@mui/material';
import { openWhatsApp, openLinkedIn } from '../utils/contactUtils';
import ContactInfoDisplay from './ContactInfoDisplay';

const ContactButtonsWrapper = ({ mentor }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [dialogValue, setDialogValue] = useState('');

  const handleEmailClick = () => {
    setDialogType('email');
    setDialogValue(mentor.email);
    setDialogOpen(true);
  };

  const handlePhoneClick = () => {
    setDialogType('phone');
    setDialogValue(mentor.phone);
    setDialogOpen(true);
  };

  const handleWhatsAppClick = () => {
    openWhatsApp(mentor.phone);
  };

  const handleLinkedInClick = () => {
    openLinkedIn(mentor.linkedinUrl, `${mentor.firstName} ${mentor.lastName}`);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const mentorName = `${mentor.firstName} ${mentor.lastName}`;

  return (
    <>
      <Button onClick={handleWhatsAppClick}>Whatsapp</Button>
      <Button onClick={handleEmailClick}>Email</Button>
      <Button onClick={handleLinkedInClick}>LinkedIn</Button>
      <Button onClick={handlePhoneClick}>Phone</Button>

      <ContactInfoDisplay
        open={dialogOpen}
        onClose={handleCloseDialog}
        type={dialogType}
        value={dialogValue}
        mentorName={mentorName}
      />
    </>
  );
};

export default ContactButtonsWrapper;
