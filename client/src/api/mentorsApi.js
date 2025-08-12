// client/src/api/mentorsApi.js

// If you have a real backend, set REACT_APP_API_BASE_URL in client/.env
// Example: REACT_APP_API_BASE_URL=http://localhost:5000/api
const BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

/**
 * Local mock data for development without a backend.
 * Add more items if you want a richer grid.
 */
const mock = [
    {
        id: "1",
        firstName: "נועה",
        lastName: "קירל",
        headlineTech: "JAVASCRIPT",
        yearsOfExperience: 3,
        about:
            "בוגרת תואר במדעי המחשב 2022 • מפתחת בדאטה ב-AppsFlyer • אוהבת פייתון, לולאות וקפה",
        email: "noa@example.com",
        phone: "+972501112233",
        linkedinUrl: "https://www.linkedin.com/in/noa",
        avatarUrl: "/avatars/default-female.png",
        tags: ["JAVASCRIPT", "HTML", "CSS", "REACT"],
    },
    // add more mock mentors here
];

/**
 * Fetch mentors list.
 * Falls back to mock when BASE_URL is empty.
 */
export async function fetchMentors(params = {}) {
    if (!BASE_URL) {
        // Basic client-side search/filter on mock data
        const q = (params.q || "").trim().toLowerCase();
        const tech = (params.tech || "").trim().toLowerCase();

        return mock.filter((m) => {
            const hay = `${m.firstName} ${m.lastName} ${m.headlineTech} ${(m.tags || []).join(" ")}`
                .toLowerCase();
            const passQ = q ? hay.includes(q) : true;
            const passTech = tech ? hay.includes(tech) : true;
            return passQ && passTech;
        });
    }

    const url = new URL(`${BASE_URL}/mentors`);
    if (params.q) url.searchParams.set("q", params.q);
    if (params.tech) url.searchParams.set("tech", params.tech);

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error("Failed to load mentors");
    return res.json();
}

/**
 * Fetch a single mentor by id.
 * Falls back to mock when BASE_URL is empty.
 */
export async function fetchMentorById(id) {
    if (!BASE_URL) {
        return mock.find((m) => m.id === id) || null;
    }
    const res = await fetch(`${BASE_URL}/mentors/${id}`);
    if (!res.ok) return null;
    return res.json();
}