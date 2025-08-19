import React from "react";
import "./UserHeader.css";

const UserHeader = ({ user, userType }) => {
    const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");
    const image = user?.image || user?.imageUrl;

    const getSubtitle = () => {
        if (userType === 'mentor') {
            return user?.description ?? "—";
        } else if (userType === 'mentee') {
            return user?.email || "—";
        }
        return "—";
    };

    return (
        <div className={`user-header user-header--${userType}`}>
            <div className="user-header__image-container">
                {image ? (
                    <img 
                        className="user-header__avatar" 
                        src={image} 
                        alt={fullName}
                        onError={(e) => {
                            console.log("Image loading error:", e.target.src);
                            e.target.style.display = 'none';
                            if (e.target.nextSibling) {
                                e.target.nextSibling.style.display = 'flex';
                            }
                        }}
                        onLoad={() => {
                            console.log("Image loaded successfully:", image);
                        }}
                    />
                ) : null}
                
                <div 
                    className="user-header__avatar-placeholder"
                    style={{ display: image ? 'none' : 'flex' }}
                >
                    {fullName.split(' ').map(name => name[0]).join('').toUpperCase() || '?'}
                </div>
            </div>

            <h3 className="user-header__name">
                {fullName || 'Anonymous User'}
            </h3>
            
            <p className="user-header__subtitle">
                {getSubtitle()}
            </p>

            
        </div>
    );
};

export default UserHeader;