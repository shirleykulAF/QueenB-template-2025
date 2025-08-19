import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import TipCard from '../../components/Tips/TipCard';
import AddTipModal from '../../components/Tips/AddTipModal';
import './TipsPage.css';

const TipsPage = ({ user }) => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const observerRef = useRef();
  const loadingRef = useRef();

  const categories = ['All', 'Career', 'Technical', 'Soft Skills', 'Networking', 'Interview', 'Other'];

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
    setTips([]);
    setHasMore(true);
  }, [category, debouncedSearch]);

  // Fetch tips when filters or page changes
  useEffect(() => {
    fetchTips();
  }, [category, debouncedSearch, currentPage]);

  // Intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          setCurrentPage(prev => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, loadingMore]);

  const fetchTips = async () => {
    try {
      if (currentPage === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const params = new URLSearchParams({
        page: currentPage,
        limit: 10
      });
      
      if (category !== 'All') {
        params.append('category', category);
      }
      
      if (debouncedSearch.trim()) {
        params.append('search', debouncedSearch.trim());
      }

      const response = await axios.get(`/api/tips?${params}`);
      const data = response.data;
      
      if (currentPage === 1) {
        setTips(data.tips);
      } else {
        setTips(prev => [...prev, ...data.tips]);
      }
      
      setHasMore(data.pagination.hasMore);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch tips');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleAddTip = async (tipData) => {
    try {
      const response = await axios.post('/api/tips', tipData, {
        headers: {
          'user-id': user._id
        }
      });

      const newTip = response.data;
      setTips(prev => [newTip, ...prev]);
      setShowAddModal(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create tip');
    }
  };

  const handleDeleteTip = async (tipId) => {
    try {
      await axios.delete(`/api/tips/${tipId}`, {
        headers: {
          'user-id': user._id
        }
      });

      setTips(prev => prev.filter(tip => tip._id !== tipId));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to delete tip');
    }
  };

  const handleUpdateTip = async (tipId, tipData) => {
    try {
      const response = await axios.put(`/api/tips/${tipId}`, tipData, {
        headers: {
          'user-id': user._id
        }
      });

      const updatedTip = response.data;
      setTips(prev => prev.map(tip => 
        tip._id === tipId ? updatedTip : tip
      ));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update tip');
    }
  };

  const resetFilters = () => {
    setCategory('All');
    setSearch('');
    setCurrentPage(1);
    setTips([]);
    setHasMore(true);
  };

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      setCurrentPage(prev => prev + 1);
    }
  };

  if (loading && currentPage === 1) {
    return (
      <div className="tips-page">
        <div className="tips-page-header">
          <h1>Tips & Advice</h1>
          {user?.userType === 'mentor' && (
            <button 
              className="add-tip-btn"
              onClick={() => setShowAddModal(true)}
            >
              + Add New Tip
            </button>
          )}
        </div>
        <div className="loading-skeleton">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="tip-skeleton">
              <div className="skeleton-header">
                <div className="skeleton-avatar"></div>
                <div className="skeleton-text">
                  <div className="skeleton-line"></div>
                  <div className="skeleton-line short"></div>
                </div>
              </div>
              <div className="skeleton-category"></div>
              <div className="skeleton-title"></div>
              <div className="skeleton-content">
                <div className="skeleton-line"></div>
                <div className="skeleton-line"></div>
                <div className="skeleton-line short"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="tips-page">
      <div className="tips-page-header">
        <h1>Tips & Advice</h1>
        {user?.userType === 'mentor' && (
          <button 
            className="add-tip-btn"
            onClick={() => setShowAddModal(true)}
          >
            + Add New Tip
          </button>
        )}
      </div>

      <div className="tips-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search tips..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="category-filter">
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="category-select"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <button 
          onClick={resetFilters}
          className="reset-filters-btn"
        >
          Reset
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="tips-grid">
        {tips.map(tip => (
          <TipCard
            key={tip._id}
            tip={tip}
            user={user}
            onDelete={handleDeleteTip}
            onUpdate={handleUpdateTip}
          />
        ))}
      </div>

      {loadingMore && (
        <div className="loading-more">
          Loading more tips...
        </div>
      )}

      {!loading && tips.length === 0 && !error && (
        <div className="no-tips">
          <p>No tips found. {user?.userType === 'mentor' && 'Be the first to share some wisdom!'}</p>
        </div>
      )}

      {/* Intersection observer target for infinite scroll */}
      <div ref={loadingRef} className="scroll-trigger">
        {hasMore && !loadingMore && (
          <button onClick={loadMore} className="load-more-btn">
            Load More Tips
          </button>
        )}
      </div>

      {showAddModal && (
        <AddTipModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddTip}
        />
      )}
    </div>
  );
};

export default TipsPage;
