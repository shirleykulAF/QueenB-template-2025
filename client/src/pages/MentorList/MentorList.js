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
    <div className="mentor-list">
      <h1>מנטוריות</h1>
      <div className="mentor-list-cards" >
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
