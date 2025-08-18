import React from 'react';
import UserInfo from '../../UserBase/UserInfo/UserInfo';

const MenteeInfo = ({ mentee }) => {
  return (
    <UserInfo 
      user={mentee}           
      userType="mentee"      
    />
  );
};

export default MenteeInfo;