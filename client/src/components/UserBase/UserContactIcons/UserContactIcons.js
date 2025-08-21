import React from 'react';
import { FaEnvelope, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import './UserContactIcons.css';

const UserContactIcons = ({ user, userType = 'mentee' }) => {
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

    const contactOptions = getContactOptions();

    if (contactOptions.length === 0) return null;

    return (
        <>
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
        </>
    );
};

export default UserContactIcons;