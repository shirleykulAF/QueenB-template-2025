// client/src/pages/MentorsListPage.js

import React, { useEffect, useState } from "react";
import { fetchMentors } from "../api/mentorsApi";
import SearchBar from "../components/SearchBar/SearchBar";
import MentorGrid from "../components/MentorGrid/MentorGrid";
import MentorDetails from "../components/MentorDetails/MentorDetails";

/**
 * Mentors list page:
 * - Loads mentors (from API or mock) and shows a searchable grid.
 * - Opens a modal with mentor details on card click.
 */
export default function MentorsListPage() {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState(null);

    async function load(q) {
        setLoading(true);
        try {
            const data = await fetchMentors({ q });
            setMentors(data);
        } catch (err) {
            // Optional: you can show a toast or set error state here
            console.error(err);
            setMentors([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <div style={{ padding: 20, maxWidth: 1100, margin: "0 auto" }}>
            <SearchBar
                onSearch={(q) => {
                    setQuery(q);
                    load(q);
                }}
                initialQuery={query}
            />

            {loading ? (
                <div>טוען…</div>
            ) : (
                <MentorGrid mentors={mentors} onSelect={setSelected} />
            )}

            {selected && (
                <MentorDetails mentorId={selected.id} onClose={() => setSelected(null)} />
            )}
        </div>
    );
}