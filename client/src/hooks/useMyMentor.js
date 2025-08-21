import { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

const useMyMentor = (userId) => {
  const [mentor, setMentor] = useState(null);
  const [notes, setNotes] = useState({
    questions: '',
    insights: '',
    goals: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentor = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        const response = await axios.get(`${baseURL}/api/myMentor/mentee/${userId}`);
        setMentor(response.data.mentor);
        setNotes(response.data.notes || {
          questions: '',
          insights: '',
          goals: ''
        });
        
        setError(null);
      } catch (err) {
        console.error("Error fetching mentor data:", err);
        setError('Failed to load mentor information');
      } finally {
        setLoading(false);
      }
    };

    fetchMentor();
  }, [userId]);

  const saveNotes = async (category, content) => {
    if (!userId) return false;
    
    try {
      await axios.post(`${baseURL}/api/myMentor/mentee/${userId}/notes`, { 
        category, 
        content 
      });
      
      // Update just the specific category
      setNotes(prev => ({
        ...prev,
        [category]: content
      }));
      
      return true;
    } catch (err) {
      console.error("Error saving notes:", err);
      setError('Failed to save notes');
      return false;
    }
  };

  return { mentor, notes, loading, error, saveNotes };
};

export default useMyMentor;