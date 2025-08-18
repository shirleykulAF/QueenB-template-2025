import React from 'react';
import UserCard from '../../UserBase/UserCard/UserCard';

const MentorCard = ({ mentor, onClick, isFavorite, addFavorite, removeFavorite }) => {
  return (
    <UserCard 
      user={mentor}          
      userType="mentor"      
      onClick={onClick}
      isFavorite={isFavorite}
      addFavorite={addFavorite}
      removeFavorite={removeFavorite}
    />
  );
};

export default MentorCard;