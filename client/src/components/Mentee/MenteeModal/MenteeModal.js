import React from 'react';
import UserModal from '../../UserBase/UserModal/UserModal';

const MenteeModal = ({ mentee, onClose }) => {
  return (
    <UserModal 
      user={mentee}           
      userType="mentee"       
      onClose={onClose}
    />
  );
};

export default MenteeModal;