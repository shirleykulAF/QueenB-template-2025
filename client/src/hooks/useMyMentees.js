import { useState, useEffect } from 'react';
import axios from 'axios';

const useMyMentees = (userId) => {
    const [myMentees, setMyMentee] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch myMentees on mount or when userId changes
    useEffect(() => {
        if (!userId) return;
        setLoading(true);
        axios.get(`/api/myMentees/${userId}`)
            .then(res => setMyMentee(res.data.myMentees || []))
            .catch(() => setMyMentee([]))
            .finally(() => setLoading(false));
    }, [userId]);

    // Add mentee to myMentees
    const addMentee = async (menteeId) => {        try {
            const response = await axios.post(`/api/myMentees/${userId}/${menteeId}`);
            setMyMentee(response.data.myMentees);
            console.log('Mentee added successfully:', response.data.myMentees);
        } catch (error) {
            console.error('Failed to add mentee:', error);
            throw error;
        }
        };

    // Remove mentee from Mentees
    const removeMentee = async (menteeId) => {
        const response = await axios.delete(`/api/myMentees/${userId}/${menteeId}`);
        setMyMentee(response.data.myMentees);
    };

    // Check if mentee is in myMentees
    const isMyMentee = (menteeId) => {
        return myMentees.some(myMen => (myMen._id || myMen) === menteeId);
    };

    return { 
        myMentees, 
        loading, 
        addMentee, 
        removeMentee, 
        isMyMentee };
};

export default useMyMentees;