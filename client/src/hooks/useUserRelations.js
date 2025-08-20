import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserRelations = (userId, relationType) => {
    const [relations, setRelations] = useState([]);
    const [loading, setLoading] = useState(false);

    // Configuration object for different relation types
    const config = {
        favorites: {
            getUrl: (userId) => `/api/favorites/${userId}`,
            addUrl: (userId, targetId) => `/api/favorites/${userId}/${targetId}`,
            removeUrl: (userId, targetId) => `/api/favorites/${userId}/${targetId}`,
            dataKey: 'favoriteMentors'
        },
        mentees: {
            getUrl: (userId) => `/api/myMentees/${userId}`,
            addUrl: (userId, targetId) => `/api/myMentees/${userId}/${targetId}`,
            removeUrl: (userId, targetId) => `/api/myMentees/${userId}/${targetId}`,
            dataKey: 'myMentees'
        }
    };

    // Fetch relations on mount or when userId changes
    useEffect(() => {
        if (!userId) return;
        setLoading(true);
        axios.get(config[relationType].getUrl(userId))
            .then(res => setRelations(res.data[config[relationType].dataKey] || []))
            .catch(() => setRelations([]))
            .finally(() => setLoading(false));
    }, [userId, relationType]);

    // Add relation
    const addRelation = async (targetId) => {
        await axios.post(config[relationType].addUrl(userId, targetId));
        setRelations(prev => [...prev, targetId]);
    };

    // Remove relation
    const removeRelation = async (targetId) => {
        await axios.delete(config[relationType].removeUrl(userId, targetId));
        setRelations(prev => prev.filter(id => id !== targetId && id._id !== targetId));
    };

    // Check if relation exists
    const hasRelation = (targetId) => {
        return relations.some(rel => (rel._id || rel) === targetId);
    };

    return { 
        relations, 
        loading, 
        addRelation, 
        removeRelation, 
        hasRelation 
    };
};

export default useUserRelations;
