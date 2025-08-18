import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MentorSignupForm from '../../components/Auth/MentorSignupForm';
import { useAuth } from '../../hooks/useAuth';
import './MentorEdit.css';

const MentorEdit = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);
    
    // Get mentor data from navigation state if available
    const mentorData = location.state?.mentorData || currentUser;
    
    useEffect(() => {
        console.log("Mentor data from location:", location.state?.mentorData);
        console.log("Current user in MentorEdit:", currentUser);
        
        if (!mentorData) {
            console.log("No mentor data available, redirecting");
            navigate('/');
            return;
        }
        
        if (mentorData.userType !== 'mentor') {
            console.log("User is not a mentor, redirecting");
            navigate('/');
            return;
        }
        
        setLoading(false);
    }, [mentorData, navigate, currentUser, location]);
    
    const handleEditSuccess = () => {
        navigate('/mentor');
    };
    
    if (!mentorData || loading) {
        return <div className="loading-container">Loading...</div>;
    }
    
    return (
        <div className="mentor-edit-container">
            <h1>Edit Your Profile</h1>
            <MentorSignupForm 
                isEditMode={true}
                initialData={mentorData}
                onSuccess={handleEditSuccess}
            />
        </div>
    );
};

export default MentorEdit;