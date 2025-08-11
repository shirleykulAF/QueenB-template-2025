import React from 'react';
import './MentorCard.css';

const MentorCard = ({ mentor, onClick }) => {
  return (
    <div 
      className="mentor-card" 
      onClick={() => onClick(mentor)}
    >
      <img 
        src={mentor.image} 
        alt={`${mentor.firstName} ${mentor.lastName}`} 
      />
      <h3>{mentor.firstName} {mentor.lastName}</h3>
      <p><strong>טכנולוגיות:</strong> {mentor.technologies.join(', ')}</p>
      <p><strong>נסיון:</strong> {mentor.yearsOfExperience} שנים</p>
    </div>
  );
};

export default MentorCard;