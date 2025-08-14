import { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

const useMentorsList = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${baseURL}/api/mentors`);
        setMentors(res.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching mentors:', err);
        setError('Failed to load mentors');
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  return { mentors, loading, error };
};

export default useMentorsList;