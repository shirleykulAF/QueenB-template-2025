import { useState, useEffect } from 'react';
import axios from 'axios';

const useFavorites = (userId) => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch favorites on mount or when userId changes
    useEffect(() => {
        if (!userId) return;
        setLoading(true);
        axios.get(`/api/favorites/${userId}`)
            .then(res => setFavorites(res.data.favoriteMentors || []))
            .catch(() => setFavorites([]))
            .finally(() => setLoading(false));
    }, [userId]);

    // Add mentor to favorites
    const addFavorite = async (mentorId) => {
        await axios.post(`/api/favorites/${userId}/${mentorId}`);
        setFavorites(prev => [...prev, mentorId]);
    };

    // Remove mentor from favorites
    const removeFavorite = async (mentorId) => {
        await axios.delete(`/api/favorites/${userId}/${mentorId}`);
        setFavorites(prev => prev.filter(id => id !== mentorId && id._id !== mentorId));
    };

    // Check if mentor is favorite
    const isFavorite = (mentorId) => {
        return favorites.some(fav => (fav._id || fav) === mentorId);
    };

    return { favorites, loading, addFavorite, removeFavorite, isFavorite };
};

export default useFavorites;