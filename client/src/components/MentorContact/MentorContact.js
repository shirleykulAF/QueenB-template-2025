import React from "react";
import "./MentorContact.css";

const MentorContact = ({ mentor }) => {
        
    return (
        <div className="mentor-contact">
            <p>
                <strong>Email:</strong> {mentor?.email ?? "—"}
            </p>
            <p>
                <strong>Phone:</strong> {mentor?.phone ?? "—"}
            </p>
            <p>
                <strong>Linkedin:</strong> {mentor?.linkedin ?? "—"}
            </p>
        </div>
    );
};

export default MentorContact;
