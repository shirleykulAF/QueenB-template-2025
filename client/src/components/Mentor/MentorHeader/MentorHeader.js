import React from 'react';
import UserHeader from '../../UserBase/UserHeader/UserHeader';

const MentorHeader = ({ mentor }) => {
  return (
    <UserHeader 
      user={mentor}           
      userType="mentor"       
    />
  );
};

export default MentorHeader;