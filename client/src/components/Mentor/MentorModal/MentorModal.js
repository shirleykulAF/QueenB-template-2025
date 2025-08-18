import React from 'react';
import UserModal from '../../UserBase/UserModal/UserModal';

const MentorModal = ({ mentor, onClose }) => {
  return (
    <UserModal 
      user={mentor}           
      userType="mentor"       
      onClose={onClose}
    />
  );
};

export default MentorModal;