import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useMyMentor from '../../hooks/useMyMentor';
import MentorHeader from '../../components/Mentor/MentorHeader/MentorHeader';
import MentorInfo from '../../components/Mentor/MentorInfo/MentorInfo';
import MentorContactIcons from '../../components/Mentor/MentorContactIcons/MentorContactIcons';
import './MyMentor.css';

const MyMentor = ({ user }) => {
  const navigate = useNavigate();
  const { mentor, notes, loading, error, saveNotes } = useMyMentor(user?._id);
  const [activeTab, setActiveTab] = useState('questions');
  const [currentNotes, setCurrentNotes] = useState({
    questions: '',
    insights: '',
    goals: ''
  });
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
      const success = await saveNotes(activeTab, currentNotes[activeTab]);
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

  const handleNoteChange = (e) => {
    setCurrentNotes(prev => ({
      ...prev,
      [activeTab]: e.target.value
    }));
  };

  if (loading) return (
    <div className="my-mentor-container">
      <div className="loading-indicator">
        <div className="loading-spinner"></div>
        <p>Loading mentor information...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="my-mentor-container">
      <div className="error-message">
        <p>Error: {error}</p>
        <button onClick={() => window.location.reload()} className="retry-button">
          Retry
        </button>
      </div>
    </div>
  );

  return (
    <div className="my-mentor-container">
      <div className="my-mentor-header">
        <h1>My Mentor</h1>
        <p className="my-mentor-subtitle">
          Connect with your mentor and manage your notes
        </p>
      </div>

      <div className="my-mentor-content">
        {/* Left column - Mentor information */}
        <div className="my-mentor-column my-mentor-column--left">
          {!mentor ? (
            <div className="no-mentor-card">
              <div className="no-mentor-icon">👩‍💼</div>
              <h2>No Mentor Assigned</h2>
              <p>You don't have a mentor assigned yet.</p>
              <p>Once you've been matched, your mentor's information will appear here.</p>
            </div>
          ) : (
            <div className="mentor-profile-card">
              <h2 className="card-title">Mentor Profile</h2>
              <MentorHeader mentor={mentor} />
              <MentorInfo mentor={mentor} />
              <div className="mentor-contact-section">
                <MentorContactIcons mentor={mentor} />
              </div>
            </div>
          )}
        </div>

        {/* Right column - Notes */}
        <div className="my-mentor-column my-mentor-column--right">
          <div className="notes-card">
            <h2 className="card-title">Mentorship Notes</h2>
            <div className="notes-tabs">
              <button 
                className={`notes-tab ${activeTab === 'questions' ? 'active' : ''}`}
                onClick={() => setActiveTab('questions')}
              >
                Questions
              </button>
              <button 
                className={`notes-tab ${activeTab === 'insights' ? 'active' : ''}`}
                onClick={() => setActiveTab('insights')}
              >
                Insights
              </button>
              <button 
                className={`notes-tab ${activeTab === 'goals' ? 'active' : ''}`}
                onClick={() => setActiveTab('goals')}
              >
                Goals
              </button>
            </div>
            
            <div className="tab-content">
              {activeTab === 'questions' && (
                <p className="tab-description">
                  Write down questions you want to ask during your next meeting.
                </p>
              )}
              {activeTab === 'insights' && (
                <p className="tab-description">
                  Record key insights and advice from your mentorship sessions.
                </p>
              )}
              {activeTab === 'goals' && (
                <p className="tab-description">
                  Document your goals and track your progress with your mentor.
                </p>
              )}
              
              <textarea
                className="mentorship-notes-textarea"
                value={currentNotes[activeTab] || ''}
                onChange={handleNoteChange}
                placeholder={`Write your ${activeTab} here...`}
                aria-label={`Mentorship ${activeTab}`}
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
        </div>
      </div>
    </div>
  );
};

export default MyMentor;