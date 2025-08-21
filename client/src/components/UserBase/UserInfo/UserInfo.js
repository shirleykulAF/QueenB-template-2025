import React from "react";
import "./UserInfo.css";

const UserInfo = ({ user = {}, userType = 'mentee' }) => {

    const renderMentorInfo = () => {
        const { technologies = [], yearsOfExperience, phone, linkedin } = user;
        
        return (
            <div className="user-info__section">
                <div className="user-info__item">
                    <strong>Experience:</strong> 
                    <span className="user-info__value">
                        {yearsOfExperience ?? "—"} years
                    </span>
                </div>
                
                <div className="user-info__item user-info__item--technologies">
                    <strong>Technologies:</strong>
                    {technologies.length ? (
                        <ul className="user-info__tech-list">
                            {technologies.map((tech, index) => (
                                <li key={index} className="user-info__tech-item">
                                    {tech}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <span className="user-info__value">—</span>
                    )}
                </div>
            </div>
        );
    };

    const renderMenteeInfo = () => {
        const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");
        
        return (
            <div className="user-info__section">
                <div className="user-info__item">
                    <strong>User Type:</strong> 
                    <span className="user-info__value user-info__value--badge user-info__value--mentee">
                        Mentee
                    </span>
                </div>
                
                <div className="user-info__item">
                    <strong>Full Name:</strong> 
                    <span className="user-info__value">
                        {fullName || 'Not provided'}
                    </span>
                </div>

                {(user.imageUrl || user.image) && (
                    <div className="user-info__item">
                        <strong>Profile Image:</strong> 
                        <span className="user-info__value user-info__value--badge user-info__value--success">
                            Available
                        </span>
                    </div>
                )}
            </div>
        );
    };

    const renderGeneralInfo = () => {
        const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");
        
        return (
            <div className="user-info__section">
                <div className="user-info__item">
                    <strong>Name:</strong> 
                    <span className="user-info__value">
                        {fullName || 'Not provided'}
                    </span>
                </div>
                
                <div className="user-info__item">
                    <strong>Email:</strong> 
                    <span className="user-info__value">
                        {user?.email || 'Not provided'}
                    </span>
                </div>
            </div>
        );
    };

    const getInfoContent = () => {
        switch (userType) {
            case 'mentor':
                return renderMentorInfo();
            case 'mentee':
                return renderMenteeInfo();
            default:
                return renderGeneralInfo();
        }
    };

    return (
        <div className={`user-info user-info--${userType}`}>
            {getInfoContent()}
        </div>
    );
};

export default UserInfo;