import React from 'react';
import './UserCard.css';
import UserHeader from '../UserHeader/UserHeader';
import { FaStar, FaRegStar } from 'react-icons/fa';

const UserCard = ({ 
  user,           // general user object
  userType,       // 'mentor' / 'mentee' 
  onClick, 
  isFavorite, 
  addFavorite, 
  removeFavorite 
}) => {
  const handleFavorite = (e) => {
    e.stopPropagation(); 
    if (isFavorite(user._id)) {
      removeFavorite(user._id);
    } else {
      addFavorite(user._id);
    }
  };

  return (
    <div 
      className={`user-card user-card--${userType}`} 
      onClick={() => onClick?.(user)}
    >
      {/* Favorite button */}
      <div className="user-card__favorite">
        <button className="favorite-btn" onClick={handleFavorite}>
          {isFavorite(user._id) ? <FaStar color="#FFD700" /> : <FaRegStar />}
        </button>
      </div>
      
        {/* User Header */}
      <UserHeader user={user} userType={userType} />
    </div>
  );
};

export default UserCard;