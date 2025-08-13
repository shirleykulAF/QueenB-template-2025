import React from "react";
import "./MentorInfo.css";

const MentorInfo = ({ mentor = {}}) => {
    const {technologies = [], yearsOfExperience} = mentor;

    return (
        <div className="mentor-info">
            <p>
                <strong>נסיון:</strong> {yearsOfExperience ?? "—"} שנים
            </p>
            <p>
                <strong>טכנולוגיות:</strong><br />
                 {technologies.length ? technologies.join(", ") : "—"}
            </p>
        </div>
    );
};

export default MentorInfo;