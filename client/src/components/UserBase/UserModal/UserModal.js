import React from 'react';
import { FaEnvelope, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import './UserModal.css'; 
import UserHeader from "../UserHeader/UserHeader";
import UserInfo from "../UserInfo/UserInfo";

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

    // Format phone number for WhatsApp
    const formatPhoneForWhatsApp = (phone) => {
        if (!phone) return '';
        const digits = phone.replace(/\D/g, '');
        if (digits.startsWith('0')) {
            return '972' + digits.substring(1);
        }
        return digits;
    };

    const email = user.email || '';
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;

    // construct contact options based on user type 
        const getContactOptions = () => {
        const options = [
            {
                icon: <FaEnvelope size={24} color="#D44638" />,
                href: gmailLink,
                title: "Send Email",
                show: true
            }
        ];

        // additional options for mentors
        if (userType === 'mentor') {
            if (user.linkedin) {
                options.push({
                    icon: <FaLinkedin size={24} color="#0077B5" />,
                    href: user.linkedin,
                    title: "LinkedIn Profile",
                    show: true
                });
            }

            if (user.phone) {
                options.push({
                    icon: <FaWhatsapp size={24} color="#25D366" />,
                    href: `https://wa.me/${formatPhoneForWhatsApp(user.phone)}`,
                    title: "Send WhatsApp Message",
                    show: true
                });
            }
        }

        return options.filter(option => option.show);
    };

    //close modal on overlay click
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const contactOptions = getContactOptions();

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
                {contactOptions.length > 0 && (
                    <div className="user-modal__contact">
                        <h3 className="user-modal__contact-title">Contact</h3>
                        <div className="user-modal__contact-icons">
                            {contactOptions.map((option, index) => (
                                <a 
                                    key={index}
                                    href={option.href} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    title={option.title}
                                    className="user-modal__contact-link"
                                >
                                    {option.icon}
                                </a>
                            ))}
                        </div>

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