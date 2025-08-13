import React from "react";
import "./MentorHeader.css";

const MentorHeader = ({ mentor }) => {
    console.log("MentorHeader props:", mentor);
    const fullName = [mentor?.firstName, mentor?.lastName].filter(Boolean).join(" ");
    const image = mentor?.image;

    return (
        <div className="mentor-header">
             {image && <img className="mentor-avatar" src={image} alt={fullName} />}
            <h3>{fullName}</h3>
            <p>{mentor?.description ?? "—"}</p>
        </div>
    );
};

export default MentorHeader;