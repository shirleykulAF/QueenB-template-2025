// client/src/api/mentorsApi.js

const BASE_URL = process.env.REACT_APP_API_BASE_URL || ""; // e.g., http://localhost:5000/api

function buildUrl(path) {
  // Ensures single slash between base and path
  if (!BASE_URL) return path;
  return `${BASE_URL.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

/**
 * Load mentors from your backend.
 * - If q is provided → GET /api/mentors/search?q=...
 * - Otherwise → GET /api/mentors
 * Returns an array of mentor view models ready for the UI.
 */
export async function fetchMentors({ q = "" } = {}) {
  const url = q
    ? buildUrl(`/mentors/search?q=${encodeURIComponent(q)}`)
    : buildUrl(`/mentors`);

  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) throw new Error(`Failed to fetch mentors (${res.status})`);

  const data = await res.json();
  const list = Array.isArray(data.mentors) ? data.mentors : [];

  // Normalize fields for the UI (id/photo aliasing)
  return list.map((m) => ({
    id: m._id || m.id,
    firstName: m.firstName,
    lastName: m.lastName,
    email: m.email,
    phone: m.phoneNumber,
    generalDescription: m.generalDescription,
    yearsOfExperience: m.yearsOfExperience,
    programmingLanguages: m.programmingLanguages,
    technologies: m.technologies,
    domains: m.domains,
    linkedinUrl: m.linkedinUrl,
    avatarUrl: m.photoUrl, // backend sends a photo URL per mentor
  }));
}

/**
 * Load a single mentor by ID for the details page/modal.
 * Backend returns { mentor: {...} }.
 */
export async function fetchMentorById(id) {
  const url = buildUrl(`/mentors/${id}`);
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) throw new Error(`Failed to fetch mentor (${res.status})`);

  const data = await res.json();
  const m = data.mentor ?? null;
  if (!m) return null;

  return {
    id: m._id || m.id,
    firstName: m.firstName,
    lastName: m.lastName,
    email: m.email,
    phone: m.phoneNumber,
    generalDescription: m.generalDescription,
    yearsOfExperience: m.yearsOfExperience,
    programmingLanguages: m.programmingLanguages,
    technologies: m.technologies,
    domains: m.domains,
    linkedinUrl: m.linkedinUrl,
    avatarUrl: m.photoUrl,
    headlineTech: m.headlineTech, // keep if your UI uses it
    about: m.about,               // keep if your UI uses it
  };
}
