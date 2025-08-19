import React, { useState } from 'react';
import MentorCard from '../../components/Mentor/MentorCard/MentorCard';
import MentorModal from '../../components/Mentor/MentorModal/MentorModal';
import useMentorsList from '../../hooks/useMentorsList';
import useFavorites from '../../hooks/useFavorites';
import useRandomTip from '../../hooks/useRandomTip';
import './MenteeHome.css';
import ChatBot from '../../components/ChatBot';

const baseURL = process.env.REACT_APP_API_URL;

const MenteeHome = ( {user} ) => {
  const { mentors, loading, error } = useMentorsList();
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [query, setQuery] = useState(''); //stores what the user types in the search bar
  const { addFavorite, removeFavorite, isFavorite } = useFavorites(user?._id);
  const { randomTip, showTip, closeTip, tipTextRef, isTruncated, isExpanded, handleDetailsToggle } = useRandomTip(user);

  if (loading) return <div className="mentor-list"><p>Loading mentors...</p></div>;
  if (error) return <div className="mentor-list"><p>Error: {error}</p></div>;

  const filteredMentors = mentors.filter((m) => { // gili update: filter
    const q = query.trim().toLowerCase();
    if (!q) return true;
    const name = `${m.firstName || ''} ${m.lastName || ''}`;
    const desc = m.description || '';
    const techs = Array.isArray(m.technologies) ? m.technologies.join(' ') : '';
    const haystack = `${name} ${desc} ${techs}`.toLowerCase();
    return q
      .split(/\s+/)
      .filter(Boolean)
      .every((w) => haystack.includes(w));
  });

  // Sort mentors: favorites first
    const sortedMentors = [...filteredMentors].sort((a, b) => {
        const aFav = isFavorite(a._id) ? -1 : 1;
        const bFav = isFavorite(b._id) ? -1 : 1;
        return aFav - bFav;
    });

  return (
    <div className="mentor-list">
      <h1>Mentors</h1>
      {showTip && randomTip && (
        <div className="random-tip-popup show" role="dialog" aria-live="polite">
          <div className="random-tip-header">
            <div className="random-tip-badge">Quick Tip</div>
            <div className="random-tip-title">{randomTip.title || 'Tip'}</div>
          </div>
          {!isExpanded && (
            <div ref={tipTextRef} className="random-tip-text">{randomTip.text}</div>
          )}

          {randomTip.content && isTruncated && (
            <details className="random-tip-details" onToggle={handleDetailsToggle}>
              <summary>
                <span className="random-tip-link-icon" aria-hidden>➜</span>
                <span>{isExpanded ? 'Show less' : 'Read full tip'}</span>
              </summary>
              <div className="random-tip-full">{randomTip.content}</div>
            </details>
          )}

          <div className="random-tip-actions">
            <button className="random-tip-gotit" onClick={closeTip} aria-label="Dismiss tip">Got it!</button>
          </div>
        </div>
      )}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="free search.."
        aria-label="search"
      />
      <div className="mentor-list-cards" >
        {sortedMentors.map(mentor => (
          <MentorCard 
            key={mentor._id} 
            mentor={mentor} 
            onClick={setSelectedMentor}
            isFavorite={isFavorite}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
          />
        ))}
      </div>

      {/* Modal to display mentor details */}
      <MentorModal mentor={selectedMentor} onClose={() => setSelectedMentor(null)} />

      {/* ChatBot - floating side window */}
      <div className="chatbot-floating">
        <ChatBot />
      </div>
    </div>
  );
};

export default MenteeHome;
