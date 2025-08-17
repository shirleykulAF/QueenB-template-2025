import React from 'react';
import './MenteeCard.css';
import { FaStar, FaRegStar } from 'react-icons/fa';

const MenteeCard = ({ mentee, onClick, isFavorite, addFavorite, removeFavorite }) => {
  const { _id, firstName, lastName, email, imageUrl } = mentee;
  const displayName = `${firstName || ''} ${lastName || ''}`.trim();

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isFavorite && isFavorite(_id)) {
      removeFavorite && removeFavorite(_id);
    } else {
      addFavorite && addFavorite(_id);
    }
  };

  const handleCardClick = () => {
    onClick && onClick(mentee);
  };

  return (
    <div className="mentee-card" onClick={handleCardClick}>
      {/* Favorite button - matching mentor card style */}
      {isFavorite && (
        <div className="mentee-card-fav">
          <button className="favorite-btn" onClick={handleFavoriteClick}>
            {isFavorite(_id) ? <FaStar color="#FFD700" /> : <FaRegStar />}
          </button>
        </div>
      )}

      {/* Mentee Header - matching mentor header structure */}
      <div className="mentee-header">
        {/* Profile Image */}
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={`${displayName} profile`}
            className="mentee-avatar"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
        ) : null}
        <div 
          className="mentee-avatar-placeholder"
          style={{ display: imageUrl ? 'none' : 'block' }}
        >
          {displayName.split(' ').map(name => name[0]).join('').toUpperCase()}
        </div>

        {/* Name */}
        <h3 className="mentee-name">{displayName || 'Anonymous User'}</h3>
        
        {/* Email */}
        <p className="mentee-email">{email}</p>
      </div>
    </div>
  );
};

export default MenteeCard;