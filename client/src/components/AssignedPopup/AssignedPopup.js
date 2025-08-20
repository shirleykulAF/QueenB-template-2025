import React from 'react';
import './AssignedPopup.css';

const AssignedPopup = ({ mentor, onClose, onViewMentor }) => {
  return (
    <div className="popup-overlay">
      <div className="assigned-popup">
        <div className="popup-header">
          <h2>Great News!</h2>
          <button className="popup-close" onClick={onClose}>×</button>
        </div>
        
        <div className="popup-content">
          <div className="popup-icon">🎉</div>
          <p className="popup-message">
            You've been assigned a mentor!
          </p>
          
          <div className="mentor-info">
            <div className="mentor-avatar">
              {mentor.image ? (
                <img src={mentor.image} alt={`${mentor.firstName} ${mentor.lastName}`} />
              ) : (
                <div className="avatar-placeholder">
                  {mentor.firstName?.charAt(0)}{mentor.lastName?.charAt(0)}
                </div>
              )}
            </div>
            <div className="mentor-details">
              <h3>{mentor.firstName} {mentor.lastName}</h3>
              {mentor.technologies && (
                <p className="mentor-tech">
                  Specializes in: {Array.isArray(mentor.technologies) 
                    ? mentor.technologies.join(', ') 
                    : mentor.technologies}
                </p>
              )}
              {mentor.yearsOfExperience && (
                <p className="mentor-experience">
                  {mentor.yearsOfExperience} years of experience
                </p>
              )}
            </div>
          </div>
          
          <div className="popup-actions">
            <button className="btn-secondary" onClick={onClose}>
              Got it
            </button>
            <button className="btn-primary" onClick={onViewMentor}>
              View Mentor Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignedPopup;