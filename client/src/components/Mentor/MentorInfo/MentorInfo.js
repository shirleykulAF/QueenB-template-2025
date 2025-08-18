import React from 'react';
import UserInfo from '../../UserBase/UserInfo/UserInfo';

// 🔄 Wrapper פשוט שמחליף את MentorInfo הקיים
const MentorInfo = ({ mentor }) => {
  return (
    <UserInfo 
      user={mentor}           // 👈 mentor הופך ל-user
      userType="mentor"       // 👈 מגדיר את הסוג
    />
  );
};

export default MentorInfo;