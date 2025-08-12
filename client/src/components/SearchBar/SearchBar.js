// client/src/components/SearchBar/SearchBar.js

import React, { useState } from "react";
import s from "./SearchBar.module.css";

/**
 * Simple search bar with a text input and a submit button.
 * Props:
 *  - initialQuery: string (optional)
 *  - onSearch: function(query: string)
 */
export default function SearchBar({ initialQuery = "", onSearch }) {
    const [q, setQ] = useState(initialQuery);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch && onSearch(q);
    };

    return (
        <form className={s.wrap} onSubmit={handleSubmit}>
            <input
                className={s.input}
                placeholder="חפשי מנטורית לפי שם או מקצוע"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                dir="rtl"
            />
            <button className={s.button} type="submit">
                חיפוש
            </button>
        </form>
    );
}