import React, { useEffect, useState } from 'react';
// import MentorCard from '../components/MentorCard';
import MentorCard from '../components/MentorCard';
import MentorModal from '../components/MentorModal';
import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

const MentorList = () => {
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);

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

  return (
    <div style={{ padding: '20px' }}>
      <h1>מנטוריות</h1>
      <div 
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center'
        }}
      >
        {mentors.map(mentor => (
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
