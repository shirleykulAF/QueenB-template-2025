import { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const useMentorData = (id) => {
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseURL}/api/mentors/mentor/${id}`);
        setMentor(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching mentor data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMentorData();
    }
  }, [id]);

  return { mentor, loading, error };
};