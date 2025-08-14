import React from "react";
import "./MentorInfo.css";

const MentorInfo = ({ mentor = {}}) => {
    const {technologies = [], yearsOfExperience} = mentor;

    return (
        <div className="mentor-info">
            <p>
                <strong>Experience:</strong> {yearsOfExperience ?? "—"} years
            </p>
            <p>
                <strong>Technologies:</strong><br />
                 {technologies.length ? technologies.join(", ") : "—"}
            </p>
        </div>
    );
};

export default MentorInfo;