import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useMyMentor from '../../hooks/useMyMentor';
import MentorHeader from '../../components/Mentor/MentorHeader/MentorHeader';
import MentorInfo from '../../components/Mentor/MentorInfo/MentorInfo';
import MentorContact from '../../components/Mentor/MentorContact/MentorContact';
import './MyMentor.css';

const MyMentor = ({ user }) => {
  const navigate = useNavigate();
  const { mentor, notes, loading, error, saveNotes } = useMyMentor(user?._id);
  const [currentNotes, setCurrentNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (notes) {
      setCurrentNotes(notes);
    }
  }, [notes]);

  const handleSaveNotes = async () => {
    setIsSaving(true);
    setSaveMessage('');
    
    try {
      const success = await saveNotes(currentNotes);
      if (success) {
        setSaveMessage('Notes saved successfully!');
        setTimeout(() => setSaveMessage(''), 3000);
      } else {
        setSaveMessage('Failed to save notes. Please try again.');
      }
    } catch (err) {
      setSaveMessage('Error saving notes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <div className="my-mentor-container"><p>Loading mentor information...</p></div>;
  if (error) return <div className="my-mentor-container"><p>Error: {error}</p></div>;

  return (
    <div className="my-mentor-container">
      <div className="my-mentor-header">
        <h1>My Mentor</h1>
        <p className="my-mentor-subtitle">
          View your mentor's information and manage your notes
        </p>
      </div>

      {!mentor ? (
        <div className="no-mentor-message">
          <p>You don't have an assigned mentor yet.</p>
          <p>Once you've been matched with a mentor, their information will appear here.</p>
        </div>
      ) : (
        <div className="my-mentor-card">
          <MentorHeader mentor={mentor} />
          <MentorInfo mentor={mentor} />
          <MentorContact mentor={mentor} />
        </div>
      )}
      
      <div className="my-mentor-notes-section">
        <h2>My Mentorship Notes</h2>
        <p className="notes-description">
          Use this space to jot down questions, insights, or topics to discuss with your mentor.
        </p>
        
        <textarea
          className="mentorship-notes-textarea"
          value={currentNotes}
          onChange={(e) => setCurrentNotes(e.target.value)}
          placeholder="Write your mentorship notes here..."
          aria-label="Mentorship notes"
        />
        
        <div className="notes-controls">
          {saveMessage && <span className="save-message">{saveMessage}</span>}
          <button 
            onClick={handleSaveNotes}
            className="save-notes-btn"
            disabled={isSaving}
          >
            {isSaving ? 'Saving...' : 'Save Notes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyMentor;