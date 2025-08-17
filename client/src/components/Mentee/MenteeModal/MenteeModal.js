import React from 'react';
import './MenteeModal.css';

const MenteeModal = ({ mentee, onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  React.useEffect(() => {
    if (!mentee) return;
    
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [mentee]);

  if (!mentee) return null;

  const { firstName, lastName, email, imageUrl } = mentee;
  const displayName = `${firstName || ''} ${lastName || ''}`.trim();

  return (
    <div className="mentee-modal-overlay" onClick={handleOverlayClick}>
      <div className="mentee-modal-container">
        {/* Close button */}
        <button 
          className="mentee-modal-close" 
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        {/* Modal content */}
        <div className="mentee-modal-content">
          {/* Header with image and name */}
          <div className="mentee-modal-header">
            <div className="mentee-modal-image-container">
              {imageUrl ? (
                <img 
                  src={imageUrl} 
                  alt={`${displayName} profile`}
                  className="mentee-modal-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div 
                className="mentee-modal-image-placeholder"
                style={{ display: imageUrl ? 'none' : 'flex' }}
              >
                {displayName.split(' ').map(name => name[0]).join('').toUpperCase()}
              </div>
            </div>

            <div className="mentee-modal-basic-info">
              <h2 className="mentee-modal-name">{displayName || 'Anonymous User'}</h2>
              <p className="mentee-modal-email">{email}</p>
            </div>
          </div>

          {/* Body with additional info */}
          <div className="mentee-modal-body">
            <div className="mentee-info-section">
              <h3>Contact Information</h3>
              <div className="mentee-contact-item">
                <strong>Email:</strong> 
                <a href={`mailto:${email}`} className="mentee-email-link">
                  {email}
                </a>
              </div>
            </div>

            <div className="mentee-info-section">
              <h3>Profile Information</h3>
              <div className="mentee-profile-item">
                <strong>User Type:</strong> Mentee
              </div>
              <div className="mentee-profile-item">
                <strong>Full Name:</strong> {displayName || 'Not provided'}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mentee-modal-footer">
            <button 
              className="mentee-modal-action-btn contact-btn"
              onClick={() => window.location.href = `mailto:${email}`}
            >
              📧 Send Email
            </button>
            <button 
              className="mentee-modal-action-btn close-btn"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenteeModal;