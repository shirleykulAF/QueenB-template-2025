import React from 'react';

const MentorCard = ({ mentor, onClick }) => {
  return (
    <div 
      className="mentor-card" 
      onClick={() => onClick(mentor)}
      style={{
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '16px',
        width: '250px',
        cursor: 'pointer',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}
    >
      <img 
        src={mentor.image} 
        alt={`${mentor.firstName} ${mentor.lastName}`} 
        style={{ width: '100px', height: '100px', borderRadius: '50%' }} 
      />
      <h3>{mentor.firstName} {mentor.lastName}</h3>
      <p><strong>טכנולוגיות:</strong> {mentor.technologies.join(', ')}</p>
      <p><strong>נסיון:</strong> {mentor.yearsOfExperience} שנים</p>
    </div>
  );
};

export default MentorCard;