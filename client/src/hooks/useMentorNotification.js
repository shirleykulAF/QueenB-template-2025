import { useState, useEffect } from 'react';
import axios from 'axios';

const useMentorNotification = (menteeId) => {
    const [showMentorPopup, setShowMentorPopup] = useState(false);
    const [assignedMentor, setAssignedMentor] = useState(null);
    const [loading, setLoading] = useState(false);

    // Key for sessionStorage to track shown notifications
    const getNotificationKey = (menteeId, mentorId) => {
        return `mentor_notification_${menteeId}_${mentorId}`;
    };

    // Check if notification was already shown for this mentor in current session
    const wasNotificationShown = (menteeId, mentorId) => {
        const key = getNotificationKey(menteeId, mentorId);
        return sessionStorage.getItem(key) === 'shown';
    };

    // Mark notification as shown for current session
    const markNotificationAsShown = (menteeId, mentorId) => {
        const key = getNotificationKey(menteeId, mentorId);
        sessionStorage.setItem(key, 'shown');
    };

    // Check for new mentor assignment
    const checkForNewMentor = async () => {
        if (!menteeId) return;

        try {
            setLoading(true);
            const response = await axios.get(`/api/myMentor/mentor/${menteeId}`);
            
            if (response.data.mentor) {
                const mentor = response.data.mentor;
                const mentorId = mentor._id;
                
                // Check if we already showed notification for this mentor in current session
                if (!wasNotificationShown(menteeId, mentorId)) {
                    setAssignedMentor(mentor);
                    setShowMentorPopup(true);
                }
            }
        } catch (error) {
            console.error('Error checking for mentor:', error);
        } finally {
            setLoading(false);
        }
    };

    // Close popup and mark as shown for current session
    const closeMentorPopup = () => {
        if (assignedMentor) {
            markNotificationAsShown(menteeId, assignedMentor._id);
        }
        setShowMentorPopup(false);
        setAssignedMentor(null);
    };

    // Check for mentor when component mounts or menteeId changes
    useEffect(() => {
        checkForNewMentor();
    }, [menteeId]);

    return {
        showMentorPopup,
        assignedMentor,
        loading,
        closeMentorPopup,
        checkForNewMentor // In case you want to manually refresh
    };
};

export default useMentorNotification;