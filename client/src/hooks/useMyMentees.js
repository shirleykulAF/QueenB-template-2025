import { useState, useEffect } from 'react';
import axios from 'axios';

const useMyMentees = (userId) => {
    const [myMentees, setMyMentees] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch myMentees on mount or when userId changes
    useEffect(() => {
        if (!userId) return;
        setLoading(true);
        axios.get(`/api/myMentees/${userId}`)
            .then(res => setMyMentees(res.data.myMentees || []))
            .catch(() => setMyMentees([]))
            .finally(() => setLoading(false));
    }, [userId]);

    // Add mentee to myMentees
    const addMentee = async (menteeId) => {
        const res = await axios.post(`/api/myMentees/${userId}/${menteeId}`);
        setMyMentees(res.data.myMentees); // Use the server's response directly
        console.log('Mentee added successfully:', res.data.myMentees);
    };

    // Remove mentee from Mentees
    const removeMentee = async (menteeId) => {
        const response = await axios.delete(`/api/myMentees/${userId}/${menteeId}`);
        setMyMentees(response.data.myMentees);
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