import React from 'react';
import { FaEnvelope, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import './UserModal.css'; 
import UserHeader from "../UserHeader/UserHeader";
import UserInfo from "../UserInfo/UserInfo";

const UserModal = ({ user, userType = 'mentee', onClose }) => {
    // טיפול באירועי מקלדת
    const handleKeyDown = React.useCallback((e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    }, [onClose]);

    // Effect לניהול מקלדת וscroll - MUST be before early return
    React.useEffect(() => {
        if (!user) return;
        
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden'; // מנע scroll ברקע
        
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [user, handleKeyDown]);

    // Early return אחרי כל ה-Hooks
    if (!user) return null;

    // פונקציה לעיצוב מספר WhatsApp (למנטורים)
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

    // פונקציה שמחזירה רשימת אפשרויות קשר לפי סוג המשתמש
    const getContactOptions = () => {
        const options = [
            {
                icon: <FaEnvelope size={24} color="#D44638" />,
                href: gmailLink,
                title: "Send Email",
                show: true
            }
        ];

        // למנטורים - הוסף LinkedIn ו-WhatsApp
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

    // טיפול בלחיצה על הbackground לסגירת המודל
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
                {/* כפתור סגירה */}
                <button 
                    onClick={onClose} 
                    className="user-modal__close"
                    aria-label="Close modal"
                >
                    &times;
                </button>
                
                {/* Header עם תמונה ושם */}
                <UserHeader user={user} userType={userType} />
                
                {/* מידע נוסף על המשתמש */}
                <UserInfo user={user} userType={userType} />
                
                {/* אפשרויות קשר */}
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

                        {/* כפתורי פעולה */}
                        <div className="user-modal__actions">
                            <button 
                                className="user-modal__action-btn user-modal__action-btn--primary"
                                onClick={() => window.location.href = `mailto:${email}`}
                            >
                                📧 Send Email
                            </button>
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