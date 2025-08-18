import React from 'react';
import UserCard from '../../UserBase/UserCard/UserCard';

const MenteeCard = ({ mentee, onClick, isFavorite, addFavorite, removeFavorite }) => {
  return (
    <UserCard 
      user={mentee}           
      userType="mentee"       
      onClick={onClick}
      isFavorite={isFavorite}
      addFavorite={addFavorite}
      removeFavorite={removeFavorite}
      userId={mentee._id}   
    />
  );
};

export default MenteeCard;