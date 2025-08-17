import React from "react";
import "./MentorInfo.css";

const MentorInfo = ({ mentor = {}}) => {
    const {technologies = [], yearsOfExperience} = mentor;

    return (
        <div className="mentor-info-section">
            <p>
                <strong>Experience:</strong> {yearsOfExperience ?? "—"} years
            </p>
            <div className="technologies-section">
                <p><strong>Technologies:</strong></p>
                {technologies.length ? (
                    <ul className="technologies-list">
                        {technologies.map((tech, index) => (
                            <li key={index} className="tech-item">{tech}</li>
                        ))}
                    </ul>
                ) : "—"}
            </div>
        </div>
    );
};

export default MentorInfo;