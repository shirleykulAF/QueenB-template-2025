import React, { useState } from 'react';
import './AddTipModal.css';

const AddTipModal = ({ onClose, onSubmit, tip = null, isEditing = false }) => {
  const [formData, setFormData] = useState({
    title: tip?.title || '',
    content: tip?.content || '',
    category: tip?.category || 'Other',
    tags: tip?.tags?.join(', ') || ''
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const categories = ['Career', 'Technical', 'Soft Skills', 'Networking', 'Interview', 'Other'];

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Title must be less than 200 characters';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.length > 2000) {
      newErrors.content = 'Content must be less than 2000 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    
    try {
      const tipData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        category: formData.category,
        tags: formData.tags
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag.length > 0)
          .slice(0, 10) // Limit to 10 tags
      };

      await onSubmit(tipData);
    } catch (error) {
      console.error('Error submitting tip:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{isEditing ? 'Edit Tip' : 'Add New Tip'}</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="tip-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter a descriptive title for your tip"
              className={errors.title ? 'error' : ''}
              maxLength={200}
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="category-select"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="content">Content *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Share your valuable advice, tips, or insights..."
              rows={6}
              className={errors.content ? 'error' : ''}
              maxLength={2000}
            />
            {errors.content && <span className="error-text">{errors.content}</span>}
            <div className="char-count">
              {formData.content.length}/2000 characters
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags (optional)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Enter tags separated by commas (e.g., JavaScript, React, Career)"
              maxLength={500}
            />
            <small className="help-text">
              Add relevant tags to help others find your tip. Separate multiple tags with commas.
            </small>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={onClose}
              className="cancel-btn"
              disabled={submitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="submit-btn"
              disabled={submitting}
            >
              {submitting ? 'Saving...' : (isEditing ? 'Update Tip' : 'Add Tip')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTipModal;
