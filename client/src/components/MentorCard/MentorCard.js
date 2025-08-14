import React from 'react';
import './MentorCard.css';
import MentorHeader from "../MentorHeader/MentorHeader";

const MentorCard = ({ mentor, onClick }) => {
  return (
    <div className="mentor-card" onClick={() => onClick?.(mentor)}>
      <MentorHeader mentor={mentor} />
    </div>
  );
};

export default MentorCard;