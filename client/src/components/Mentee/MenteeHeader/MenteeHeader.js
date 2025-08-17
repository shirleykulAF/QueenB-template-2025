import React from "react";
import "./UserHeader.css";

const UserHeader = ({ user }) => {
    const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");
    const image = user?.image;

    return (
        <div className="user-header">
             {image && <img className="user-avatar" src={image} alt={fullName} />}
            <h3>{fullName}</h3>
        </div>
    );
};

export default UserHeader;