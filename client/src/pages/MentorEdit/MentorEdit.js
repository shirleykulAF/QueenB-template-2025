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
        if (!mentorData) {
            navigate('/');
            return;
        }
        
        if (mentorData.userType !== 'mentor') {
            navigate('/');
            return;
        }
        
        setLoading(false);
    }, [mentorData, navigate, currentUser, location]);
    
    const handleEditSuccess = () => {
        navigate('/');
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