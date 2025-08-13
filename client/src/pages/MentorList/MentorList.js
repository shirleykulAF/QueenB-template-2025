import React, { useState } from 'react';
import MentorCard from '../../components/MentorCard/MentorCard';
import MentorModal from '../../components/MentorModal/MentorModal';
import useMentorsList from '../../hooks/useMentorsList';
import './MentorList.css';

const MentorList = () => {
  const { mentors, loading, error } = useMentorsList();
  const [selectedMentor, setSelectedMentor] = useState(null);

  if (loading) return <div className="mentor-list"><p>Loading mentors...</p></div>;
  if (error) return <div className="mentor-list"><p>Error: {error}</p></div>;

  return (
    <div className="mentor-list">
      <h1>מנטוריות</h1>
      <div className="mentor-list-cards">
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
