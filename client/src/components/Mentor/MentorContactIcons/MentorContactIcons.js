import React from 'react';
import UserContactIcons from '../../UserBase/UserContactIcons/UserContactIcons';

const MentorContactIcons = ({ mentor }) => {
  return (
    <UserContactIcons 
      user={mentor}           
      userType="mentor"       
    />
  );
};

export default MentorContactIcons;