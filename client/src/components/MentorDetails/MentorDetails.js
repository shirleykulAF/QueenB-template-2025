// client/src/components/MentorDetails/MentorDetails.js

import React, { useEffect, useState } from "react";
import { fetchMentorById } from "../../api/mentorsApi";
import s from "./MentorDetails.module.css";
import { MailIcon, PhoneIcon, WhatsappIcon, LinkedinIcon } from "../Icons";

// Utility: keep only digits (for WhatsApp link)
function numbersOnly(x) {
    return (x || "").replace(/[^\d]/g, "");
}

/**
 * Props:
 *  - mentorId: string
 *  - onClose: function
 */
export default function MentorDetails({ mentorId, onClose }) {
    const [mentor, setMentor] = useState(null);

    useEffect(() => {
        fetchMentorById(mentorId).then(setMentor);
    }, [mentorId]);

    if (!mentor) return null;

    const fullName = `${mentor.firstName} ${mentor.lastName}`.trim();
    const avatar = mentor.avatarUrl || "/avatars/default-female.png";
    const mailHref = mentor.email ? `mailto:${mentor.email}` : undefined;
    const telHref = mentor.phone ? `tel:${mentor.phone}` : undefined;
    const waHref = mentor.phone ? `https://wa.me/${numbersOnly(mentor.phone)}` : undefined;

    return (
        <div className={s.backdrop} onClick={onClose}>
            <div className={s.panel} onClick={(e) => e.stopPropagation()}>
                {/* Close button (UI text can stay in Hebrew) */}
                <button className={s.close} onClick={onClose} aria-label="סגירה">
                    ✕
                </button>

                <img className={s.avatar} src={avatar} alt={fullName} />

                <div>
                    {/* Small LinkedIn icon next to the name */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {mentor.linkedinUrl && (
                            <a
                                href={mentor.linkedinUrl}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="LinkedIn"
                            >
                                <LinkedinIcon />
                            </a>
                        )}
                        <div className={s.name}>{fullName}</div>
                    </div>

                    <div className={s.head}>{mentor.headlineTech}</div>

                    {!!mentor.about && (
                        <div className={s.about}>
                            {mentor.about.split("•").map((line, i) => (
                                <div key={i}>• {line.trim()}</div>
                            ))}
                        </div>
                    )}

                    <div className={s.row} style={{ marginTop: 18 }}>
                        {mailHref && (
                            <a className={s.iconBtn} href={mailHref} aria-label="Email">
                                <MailIcon />
                            </a>
                        )}
                        {telHref && (
                            <a className={s.iconBtn} href={telHref} aria-label="Phone">
                                <PhoneIcon />
                            </a>
                        )}
                        {waHref && (
                            <a className={s.iconBtn} href={waHref} aria-label="WhatsApp">
                                <WhatsappIcon />
                            </a>
                        )}
                        {mentor.linkedinUrl && (
                            <a
                                className={s.iconBtn}
                                href={mentor.linkedinUrl}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="LinkedIn"
                            >
                                <LinkedinIcon />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}