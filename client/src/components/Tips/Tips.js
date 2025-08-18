import React, { useState, useEffect } from 'react';
import AddTipModal from './AddTipModal';
import TipCard from './TipCard';
import './Tips.css';

const baseURL = process.env.REACT_APP_API_URL;

const Tips = ({ user }) => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const categories = ['All', 'Career', 'Technical', 'Soft Skills', 'Networking', 'Interview', 'Other'];

  useEffect(() => {
    fetchTips();
  }, [category, search, currentPage]);

  const fetchTips = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage,
        limit: 10
      });
      
      if (category !== 'All') {
        params.append('category', category);
      }
      
      if (search.trim()) {
        params.append('search', search.trim());
      }

      const response = await fetch(`${baseURL}/api/tips?${params}`);
      if (!response.ok) {
        throw new Error('Failed to fetch tips');
      }

      const data = await response.json();
      
      if (currentPage === 1) {
        setTips(data.tips);
      } else {
        setTips(prev => [...prev, ...data.tips]);
      }
      
      setHasMore(data.pagination.hasMore);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTip = async (tipData) => {
    try {
      const response = await fetch(`${baseURL}/api/tips`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-id': user._id
        },
        body: JSON.stringify(tipData)
      });

      if (!response.ok) {
        throw new Error('Failed to create tip');
      }

      const newTip = await response.json();
      setTips(prev => [newTip, ...prev]);
      setShowAddModal(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteTip = async (tipId) => {
    try {
      const response = await fetch(`${baseURL}/api/tips/${tipId}`, {
        method: 'DELETE',
        headers: {
          'user-id': user._id
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete tip');
      }

      setTips(prev => prev.filter(tip => tip._id !== tipId));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateTip = async (tipId, tipData) => {
    try {
      const response = await fetch(`${baseURL}/api/tips/${tipId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'user-id': user._id
        },
        body: JSON.stringify(tipData)
      });

      if (!response.ok) {
        throw new Error('Failed to update tip');
      }

      const updatedTip = await response.json();
      setTips(prev => prev.map(tip => 
        tip._id === tipId ? updatedTip : tip
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  const loadMore = () => {
    if (!loading && hasMore) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const resetFilters = () => {
    setCategory('All');
    setSearch('');
    setCurrentPage(1);
    setTips([]);
  };

  return (
    <div className="tips-container">
      <div className="tips-header">
        <h2>Tips & Advice</h2>
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

      {loading && (
        <div className="loading">
          Loading tips...
        </div>
      )}

      {!loading && tips.length === 0 && !error && (
        <div className="no-tips">
          <p>No tips found. {user?.userType === 'mentor' && 'Be the first to share some wisdom!'}</p>
        </div>
      )}

      {hasMore && !loading && (
        <div className="load-more">
          <button onClick={loadMore} className="load-more-btn">
            Load More Tips
          </button>
        </div>
      )}

      {showAddModal && (
        <AddTipModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddTip}
        />
      )}
    </div>
  );
};

export default Tips;
