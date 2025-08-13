import React from 'react';
import { FaEnvelope, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import './MentorModal.css'; 
import MentorHeader from "../MentorHeader/MentorHeader";
import MentorInfo from "../MentorInfo/MentorInfo";

const MentorModal = ({ mentor, onClose }) => {
    if (!mentor) return null;

    const formatPhoneForWhatsApp = (phone) => {
        if (!phone) return '';
        const digits = phone.replace(/\D/g, '');
        if (digits.startsWith('0')) {
            return '972' + digits.substring(1);
        }
        return digits;
    };

    const email = mentor.email || '';
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;

    return (
        <div className="background" onClick={onClose}>
            <div className="content" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="closeBtn">
                    &times;
                </button>
                
                <MentorHeader mentor={mentor} />
                <MentorInfo mentor={mentor} />
                
                {/* <img 
                    src={mentor.image} 
                    alt={`${mentor.firstName} ${mentor.lastName}`} 
                    className="avatar"
                />
                <h2>{`${mentor.firstName} ${mentor.lastName}`}</h2>
                <p><strong>טכנולוגיות:</strong> {mentor.technologies.join(', ')}</p>
                <p><strong>נסיון:</strong> {mentor.yearsOfExperience} שנים</p>
                <p>{mentor.description}</p>
                 */}
                <div className="contactIcons">
                    <a href={gmailLink} target="_blank" rel="noreferrer" title="שלחי אימייל">
                        <FaEnvelope size={24} color="#D44638" />
                    </a>
                    <a href={mentor.linkedin} target="_blank" rel="noreferrer" title="פרופיל לינקדין">
                        <FaLinkedin size={24} color="#0077B5" />
                    </a>
                    <a
                        href={`https://wa.me/${formatPhoneForWhatsApp(mentor.phone)}`}
                        target="_blank"
                        rel="noreferrer"
                        title="שלחי וואטסאפ"
                    >
                        <FaWhatsapp size={24} color="#25D366" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default MentorModal;
