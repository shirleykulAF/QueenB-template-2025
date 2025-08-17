import React from 'react';
import './MentorCard.css';
import MentorHeader from "../MentorHeader/MentorHeader";
import { FaStar, FaRegStar } from 'react-icons/fa';

const MentorCard = ({ mentor, onClick, isFavorite, addFavorite, removeFavorite }) => {
  const handleFavorite = (e) => {
    e.stopPropagation(); 
    if (isFavorite(mentor._id)) {
      removeFavorite(mentor._id);
    } else {
      addFavorite(mentor._id);
    }
  };

  return (
    <div className="mentor-card" onClick={() => onClick?.(mentor)}>
      <div className="mentor-card-fav">
        <button className="favorite-btn" onClick={handleFavorite}>
          {isFavorite(mentor._id) ? <FaStar color="#FFD700" /> : <FaRegStar />}
        </button>
      </div>
      <MentorHeader mentor={mentor} />
    </div>
  );
};

export default MentorCard;