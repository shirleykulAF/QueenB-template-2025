import { useState, useEffect } from 'react';
import axios from 'axios';

const useMyMentees = (userId) => {
    const [myMentees, setMyMentees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false); // Prevent multiple requests

    // Fetch myMentees on mount or when userId changes
    useEffect(() => {
        if (!userId) return;
        setLoading(true);
        axios.get(`/api/myMentees/${userId}`)
            .then(res => setMyMentees(res.data.myMentees || []))
            .catch(() => setMyMentees([]))
            .finally(() => setLoading(false));
    }, [userId]);

    // Check if the mentee already has a mentor
    const hasMentor = async (menteeId) => {
        try {
            const response = await axios.get(`/api/myMentor/mentor/${menteeId}`);
            return !!response.data.mentor;
        } catch (error) {
            console.error('Error checking if mentee has a mentor:', error);
            return false;
        }
    }

    // Add mentee - with race condition protection
    const addMentee = async (menteeId) => {
        // Prevent multiple simultaneous requests
        if (isProcessing) {
            return;
        }

        try {
            setIsProcessing(true);
            
            // 1. Check first if mentee already has a mentor
            const menteeHasMentor = await hasMentor(menteeId);
            
            if (menteeHasMentor) {
                alert('Mentee already has a mentor');
                return;
            }
            
            // 2. Add to my mentees list
            const response = await axios.post(`/api/myMentees/${userId}/${menteeId}`);
            
            // 3. Set myself as mentor for the mentee
            await axios.post(`/api/myMentor/${userId}/${menteeId}`);
            
            // 4. Update the state
            setMyMentees(response.data.myMentees);
            
        } catch (error) {
            console.error('Error adding mentee:', error);
            alert('Failed to add mentee. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    // Remove mentee from Mentees
    const removeMentee = async (menteeId) => {
        if (isProcessing) {
            return;
        }

        try {
            setIsProcessing(true);
            
            // 1. Remove from myMentees list
            const response = await axios.delete(`/api/myMentees/${userId}/${menteeId}`);
            
            // 2. Remove the relationship from myMentor
            await axios.delete(`/api/myMentor/${userId}/${menteeId}`);
            
            setMyMentees(response.data.myMentees);
        } catch (error) {
            console.error('Error removing mentee:', error);
        } finally {
            setIsProcessing(false);
        }
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
        isMyMentee,
        isProcessing
    };
};

export default useMyMentees;