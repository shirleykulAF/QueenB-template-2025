import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenteeCard from '../../components/Mentee/MenteeCard/MenteeCard';
import MenteeModal from '../../components/Mentee/MenteeModal/MenteeModal';
import useMenteesList from '../../hooks/useMenteesList';
import useFavorites from '../../hooks/useFavorites';
import useMyMentees from '../../hooks/useMyMentees';
import './MenteesIndex.css';

const baseURL = process.env.REACT_APP_API_URL;

const MenteesIndex = ({ user }) => {
  const navigate = useNavigate();

  const { mentees, loading, error } = useMenteesList();
  const [selectedMentee, setSelectedMentee] = useState(null);
  const [query, setQuery] = useState(''); // stores what the user types in the search bar
  const { addMentee, removeMentee, isMyMentee } = useMyMentees(user?._id);

  if (loading) return <div className="mentee-list"><p>Loading mentees...</p></div>;
  if (error) return <div className="mentee-list"><p>Error: {error}</p></div>;


  const filteredMentees = mentees.filter((mentee) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    
    const name = `${mentee.firstName || ''} ${mentee.lastName || ''}`;
    const email = mentee.email || '';
    const haystack = `${name} ${email}`.toLowerCase();
    
    return q
      .split(/\s+/)
      .filter(Boolean)
      .every((word) => haystack.includes(word));
  });

  // Sort mentees: favorites first, then alphabetically by name
  const sortedMentees = [...filteredMentees].sort((a, b) => {
    const aMyMentee = isMyMentee(a._id) ? -1 : 1;
    const bMyMentee = isMyMentee(b._id) ? -1 : 1;
    
    if (aMyMentee !== bMyMentee) {
      return aMyMentee - bMyMentee;
    } 
    

    
    // Then sort alphabetically by name
    const aName = `${a.firstName || ''} ${a.lastName || ''}`.trim().toLowerCase();
    const bName = `${b.firstName || ''} ${b.lastName || ''}`.trim().toLowerCase();
    return aName.localeCompare(bName);
  });

  return (
    <div className="mentee-list">
      <div className="mentee-list-header">
        <h1>Mentees</h1>
        <p className="mentee-list-subtitle">
          Connect with mentees looking for guidance and support
        </p>

        <button 
            onClick={() => navigate('my-mentees')}
            className="my-mentees-nav-btn"
          >
          My Mentees
        </button>  
      </div>

      <div className="mentee-list-controls">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search mentees by name or email..."
          aria-label="search mentees"
          className="mentee-search-input"
        />
        <div className="mentee-count">
          {sortedMentees.length} mentee{sortedMentees.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {sortedMentees.length === 0 ? (
        <div className="no-mentees-message">
          <p>No mentees found matching your search criteria.</p>
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="clear-search-btn"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="mentee-list-cards">
          {sortedMentees.map(mentee => (
            <MenteeCard
              key={mentee._id}
              mentee={mentee}
              onClick={setSelectedMentee}
              isMyMentee={isMyMentee}
              addMentee={addMentee}
              removeMentee={removeMentee}
              userId={user._id}
            />
          ))}
        </div>
      )}

      {/* Modal to display mentee details */}
      <MenteeModal 
        mentee={selectedMentee} 
        onClose={() => setSelectedMentee(null)} 
        isMyMentee={isMyMentee}
        addMentee={addMentee}
        removeMentee={removeMentee}
      />
    </div>
  );
};

export default MenteesIndex;