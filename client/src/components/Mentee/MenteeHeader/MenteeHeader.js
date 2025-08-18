import React from 'react';
import UserHeader from '../../UserBase/UserHeader/UserHeader';

const MenteeHeader = ({ mentee }) => {
  return (
    <UserHeader 
      user={mentee}          
      userType="mentee"      
    />
  );
};

export default MenteeHeader;