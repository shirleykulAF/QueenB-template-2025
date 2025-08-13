import React from 'react';
import './MentorCard.css';
import MentorHeader from "../MentorHeader/MentorHeader";
import MentorInfo from "../MentorInfo/MentorInfo";

const MentorCard = ({ mentor, onClick }) => {
  return (
    // <div 
    //   className="mentor-card" 
    //   onClick={() => onClick(mentor)}
    // >
    //   <img 
    //     src={mentor.image} 
    //     alt={`${mentor.firstName} ${mentor.lastName}`} 
    //   />
    //   <h3>{mentor.firstName} {mentor.lastName}</h3>
    //   <p><strong>טכנולוגיות:</strong> {mentor.technologies.join(', ')}</p>
    //   <p><strong>נסיון:</strong> {mentor.yearsOfExperience} שנים</p>
    // </div>
    <div className="mentor-card" onClick={() => onClick?.(mentor)}>
      <MentorHeader mentor={mentor} />
      {/* <MentorInfo mentor={mentor} /> */}
    </div>
  );
};

export default MentorCard;