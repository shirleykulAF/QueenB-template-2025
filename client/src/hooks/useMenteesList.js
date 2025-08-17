import { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

const useMenteesList = () => {
  const [mentees, setMentees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentees = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${baseURL}/api/mentees`);
        setMentees(res.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching mentees:', err);
        setError('Failed to load mentees');
      } finally {
        setLoading(false);
      }
    };

    fetchMentees();
  }, []);

  return { mentees, loading, error };
};

export default useMenteesList;