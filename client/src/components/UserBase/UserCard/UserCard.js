import React from 'react';
import './UserCard.css';
import UserHeader from '../UserHeader/UserHeader';
import { FaStar, FaRegStar, FaCheckCircle } from 'react-icons/fa';

const UserCard = ({ 
  user,           // general user object
  userType,       // 'mentor' / 'mentee' 
  onClick, 
  isFavorite, 
  addFavorite, 
  removeFavorite,
  addMentee,
  removeMentee,
  isMyMentee
            
}) => {
  const handleFavorite = (e) => {
    e.stopPropagation(); 
    if (isFavorite(user._id)) {
      removeFavorite(user._id);
    } else {
      addFavorite(user._id);
    }
  };

  const handleMyMentees = (e) => {
    e.stopPropagation(); 
    if (isMyMentee(user._id)) {
      removeMentee(user._id);
    } else {
      addMentee(user._id);
    }
  }

  return (
    <div 
      className={`user-card user-card--${userType}`} 
      onClick={() => onClick?.(user)}
    >
      {/* Favorite button */}
      

      { user?.userType === 'mentee' &&  (
        <div className="user-card__favorite">
          <button className="favorite-btn" onClick={handleMyMentees}>
            {isMyMentee(user._id) ? 
              <FaCheckCircle color="#bd0addff" /> : 
              <FaCheckCircle color="#ccc" />
            }
          </button>
        </div>
      )}

      { user?.userType === 'mentor' && (
      <div className="user-card__myMentees">
        <button className="favorite-btn" onClick={handleFavorite}>
          {isFavorite(user._id) ? <FaStar color="#FFD700" /> : <FaRegStar />}
        </button>
      </div>
      )}
        {/* User Header */}
      <UserHeader user={user} userType={userType} />
    </div>
  );
};

export default UserCard;