// client/src/components/MentorCard/MentorCard.js

import React from "react";
import s from "./MentorCard.module.css";

/**
 * Lightweight card for showing a mentor in the grid.
 * Props:
 *  - mentor: { firstName, lastName, headlineTech, yearsOfExperience, avatarUrl }
 *  - onClick: function(mentor)  // optional
 */
export default function MentorCard({ mentor, onClick }) {
    const fullName = `${mentor.firstName} ${mentor.lastName}`.trim();
    const avatar = mentor.avatarUrl || "/avatars/default-female.png";

    // Use keyboard accessibility when using a non-button element with role="button"
    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick && onClick(mentor);
        }
    };

    return (
        <div
            className={s.card}
            role="button"
            tabIndex={0}
            aria-label={fullName}
            onClick={() => onClick && onClick(mentor)}
            onKeyDown={handleKeyDown}
        >
            <img className={s.avatar} src={avatar} alt={fullName} />
            <div>
                <div className={s.name}>{fullName}</div>
                <div className={s.tech}>{mentor.headlineTech}</div>
                {typeof mentor.yearsOfExperience === "number" && (
                    <div className={s.years}>
                        {mentor.yearsOfExperience} שנות ניסיון
                    </div>
                )}
            </div>
        </div>
    );
}