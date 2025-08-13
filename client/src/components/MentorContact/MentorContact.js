import React from "react";
import "./MentorContact.css";

const MentorContact = ({ mentor }) => {
        
    return (
        <div className="mentor-contact">
            <p>
                <strong>אימייל:</strong> {mentor?.email ?? "—"}
            </p>
            <p>
                <strong>טלפון:</strong> {mentor?.phone ?? "—"}
            </p>
            <p>
                <strong>לינדקין:</strong> {mentor?.linkedin ?? "—"}
            </p>
        </div>
    );
};

export default MentorContact;
