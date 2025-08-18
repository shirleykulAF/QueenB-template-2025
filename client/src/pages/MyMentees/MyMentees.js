import React from 'react';
import { useAuth } from '../../hooks/useAuth'; // Fixed path
import  useUserRelations from '../../hooks/useUserRelations'; // Fixed path
import MenteeCard from '../../components/Mentee/MenteeCard/MenteeCard'; // Fixed path

const MyMentees = () => {
    const { user } = useAuth();
    const { relations: myMentees, loading } = useUserRelations(user?._id, 'mentees');

    if (loading) return <div>Loading...</div>;

    return (
        <div className="my-mentees-page">
            <h1>My Mentees</h1>
            <div className="mentees-grid">
                {myMentees.map(mentee => (
                    <MenteeCard key={mentee._id} mentee={mentee} />
                ))}
            </div>
        </div>
    );
};

export default MyMentees;