// src/App.js
import React, { useMemo, useState } from "react";
import Card from "./components/Card";
import SearchBar from "./components/SearchBar";
import { PEOPLE } from "./people";      // נתיב לפי המיקום החדש שלך
import "./index.css";

export default function App() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PEOPLE;
    return PEOPLE.filter(p => p.name.toLowerCase().includes(q));
  }, [query]);

  const handleMore = (person) => () => {
    alert(`More details about ${person.name}`);
  };

  // כשהמשתמשת לוחצת Enter ב-SearchBar:
  const handleSearchSubmit = () => {
    if (filtered.length > 0) {
      handleMore(filtered[0])(); // פותח את הראשונה כתצוגת ברירת מחדל
    }
  };

  return (
    <main className="page">
      <SearchBar
        value={query}
        onChange={setQuery}
        onSubmit={handleSearchSubmit}
        placeholder="Search by name…"
      />

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", opacity: 0.7 }}>
          <p>No matches found for “{query}”.</p>
          <button
            onClick={() => setQuery("")}
            style={{ border: "1px solid #ddd", borderRadius: 10, padding: "6px 12px", cursor: "pointer" }}
          >
            Clear search
          </button>
        </div>
      ) : (
        <section className="cards-grid">
          {filtered.map((p) => (
            <Card
              key={p.id}
              imageSrc={p.imageSrc}
              name={p.name}
              title={p.title}
              onMore={handleMore(p)}
            />
          ))}
        </section>
      )}
    </main>
  );
}
