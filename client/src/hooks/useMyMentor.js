import { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

const useMyMentor = (userId) => {
  const [mentor, setMentor] = useState(null);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentor = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        const response = await axios.get(`${baseURL}/api/myMentor/mentee/${userId}`);
        setMentor(response.data.mentor);
        setNotes(response.data.notes);
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

  const saveNotes = async (newNotes) => {
    if (!userId) return;
    
    try {
      await axios.post(`${baseURL}/api/myMentor/mentee/${userId}/${encodeURIComponent(newNotes)}`);
      setNotes(newNotes);
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