import React from 'react';
import UserCard from '../../UserBase/UserCard/UserCard';

const MenteeCard = ({ mentee, onClick, isMyMentee, addMentee, removeMentee }) => {
  return (
    <UserCard 
      user={mentee}           
      userType="mentee"       
      onClick={onClick}
      isMyMentee={isMyMentee}
      addMentee={addMentee}
      removeMentee={removeMentee}
      userId={mentee._id}   
    />
  );
};

export default MenteeCard;