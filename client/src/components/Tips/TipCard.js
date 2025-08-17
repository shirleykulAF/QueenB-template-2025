import React, { useState } from 'react';
import AddTipModal from './AddTipModal';
import './TipCard.css';

const TipCard = ({ tip, user, onDelete, onUpdate }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const isAuthor = user?._id === tip.author._id;
  const canEdit = user?.userType === 'mentor' && isAuthor;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this tip?')) {
      onDelete(tip._id);
    }
  };

  const handleUpdate = (tipData) => {
    onUpdate(tip._id, tipData);
    setShowEditModal(false);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const contentPreview = tip.content.length > 150 && !expanded 
    ? tip.content.substring(0, 150) + '...' 
    : tip.content;

  return (
    <>
      <div className="tip-card">
        <div className="tip-header">
          <div className="tip-author">
            {tip.author.image && (
              <img 
                src={tip.author.image} 
                alt={`${tip.author.firstName} ${tip.author.lastName}`}
                className="author-avatar"
              />
            )}
            <div className="author-info">
              <span className="author-name">
                {tip.author.firstName} {tip.author.lastName}
              </span>
              <span className="tip-date">{formatDate(tip.createdAt)}</span>
            </div>
          </div>
          
          {canEdit && (
            <div className="tip-actions">
              <button 
                onClick={() => setShowEditModal(true)}
                className="edit-btn"
                title="Edit tip"
              >
                ✏️
              </button>
              <button 
                onClick={handleDelete}
                className="delete-btn"
                title="Delete tip"
              >
                🗑️
              </button>
            </div>
          )}
        </div>

        <div className="tip-category">
          <span className="category-badge">{tip.category}</span>
        </div>

        <h3 className="tip-title">{tip.title}</h3>
        
        <div className="tip-content">
          <p>{contentPreview}</p>
          {tip.content.length > 150 && (
            <button 
              onClick={toggleExpanded}
              className="expand-btn"
            >
              {expanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>

        {tip.tags && tip.tags.length > 0 && (
          <div className="tip-tags">
            {tip.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        {tip.updatedAt && tip.updatedAt !== tip.createdAt && (
          <div className="tip-updated">
            <small>Updated {formatDate(tip.updatedAt)}</small>
          </div>
        )}
      </div>

      {showEditModal && (
        <AddTipModal
          tip={tip}
          isEditing={true}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleUpdate}
        />
      )}
    </>
  );
};

export default TipCard;
