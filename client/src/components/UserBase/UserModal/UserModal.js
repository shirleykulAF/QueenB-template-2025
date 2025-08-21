import React from 'react';
import './UserModal.css'; 
import UserHeader from "../UserHeader/UserHeader";
import UserInfo from "../UserInfo/UserInfo";
import UserContactIcons from "../UserContactIcons/UserContactIcons";

const UserModal = ({ user, userType = 'mentee', onClose }) => {
    // Handle Escape key to close modal
    const handleKeyDown = React.useCallback((e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    // listen for keydown events when the modal is open
    React.useEffect(() => {
        if (!user) return;
        
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden'; // stop scrolling when modal is open
        
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [user, handleKeyDown]);

    // Early return if no user
    if (!user) return null;

    //close modal on overlay click
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    
    // Check if user has contact information
    const hasContactInfo = user.email || 
        (userType === 'mentor' && (user.linkedin || user.phone));

    return (
        <div className="user-modal__overlay" onClick={handleOverlayClick}>
            <div 
                className={`user-modal__content user-modal__content--${userType}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button */}
                <button 
                    onClick={onClose} 
                    className="user-modal__close"
                    aria-label="Close modal"
                >
                    &times;
                </button>
                
                {/* User Header */}
                <UserHeader user={user} userType={userType} />
                
                <UserInfo user={user} userType={userType} />
                
                {/*contact options */}
                {hasContactInfo && (
                    <div className="user-modal__contact">
                        <UserContactIcons user={user} userType={userType} />

                        {/*close button */}
                        <div className="user-modal__actions">
                            <button 
                                className="user-modal__action-btn user-modal__action-btn--secondary"
                                onClick={onClose}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserModal;