import React from 'react';
import { FaEnvelope, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const MentorModal = ({ mentor, onClose }) => {
    if(!mentor) return null;

    const formatPhoneForWhatsApp = (phone) => {
        if (!phone) return '';
        const digits = phone.replace(/\D/g, ''); // Remove all non-digit characters
        if (digits.startsWith('0')) { // replace leading 0 with 972
            return '972' + digits.substring(1);
        }
        return digits;
    };

    // link to send email via Gmail
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${mentor.email}`;

    return (
        <div
            style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000
            }}
            onClick={onClose}   // close modal on background click
        >
            <div
                style={{
                    background: '#fff',
                    padding: '20px',
                    borderRadius: '10px',
                    maxWidth: '400px',
                    width: '100%',
                    textAlign: 'center',
                    position: 'relative'
                }}
                onClick={(e) => e.stopPropagation()} // prevent click from closing modal
            >
            
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'transparent',
                        border: 'none',
                        fontSize: '18px',
                        cursor: 'pointer'
                    }}
                >
                    &times; {   /* Close icon */}
                </button>
                <img 
                    src={mentor.image} 
                    alt={`${mentor.firstName} ${mentor.lastName}`} 
                    style={{ width: '120px', height: '120px', borderRadius: '50%' , marginBottom: '10px' }}
                />
                <h2>{`${mentor.firstName} ${mentor.lastName}`}</h2>
                <p><strong>טכנולוגיות:</strong> {mentor.technologies.join(', ')}</p>
                <p><strong>נסיון:</strong> {mentor.yearsOfExperience} שנים</p>
                <p>{mentor.description}</p>
                <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'center', gap: '15px' }}>
                    <a href={gmailLink} 
                    target="_blank" 
                    rel="noreferrer"
                    title="שלחי אימייל"> 
                        <FaEnvelope size={24} color="#D44638" />
                    </a>
                    <a href={mentor.linkedin} 
                        target="_blank" 
                        rel="noreferrer" 
                        title="פרופיל לינקדין"> 
                            <FaLinkedin size={24} color="#0077B5" /> 
                    </a>
                    <a href={`https://wa.me/${formatPhoneForWhatsApp(mentor.phone)}`} 
                        target="_blank" 
                        rel="noreferrer" 
                        title="שלחי וואטסאפ"> 
                            <FaWhatsapp size={24} color="#25D366" /> 
                    </a>
                </div>
            </div>
        </div>
    )
}

export default MentorModal;