import React, { useEffect, useState } from 'react';
// import MentorCard from '../components/MentorCard';
import MentorCard from '../../components/MentorCard/MentorCard';
import MentorModal from '../../components/MentorModal/MentorModal';
import axios from 'axios';
import './MentorList.css';

const baseURL = process.env.REACT_APP_API_URL;

const MentorList = () => {
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [query, setQuery] = useState(''); //stores what the user types in the search bar

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/mentors`);
        setMentors(res.data);
      } catch (err) {
        console.error('Error fetching mentors:', err);
      }
    };

    fetchMentors();
  }, []);

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

  return (
    <div className="mentor-list">
      <h1>Mentors</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="free search.."
        aria-label="search"
      />
      <div className="mentor-list-cards" >
        {filteredMentors.map(mentor => (
          <MentorCard 
            key={mentor._id} 
            mentor={mentor} 
            onClick={setSelectedMentor}
          />
        ))}
      </div>

      {/* Modal to display mentor details */}
      <MentorModal mentor={selectedMentor} onClose={() => setSelectedMentor(null)} />
        
    </div>
  );
};

export default MentorList;
