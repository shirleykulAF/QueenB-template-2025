import { useState } from 'react';

export const useFormState = (initialValues) => {
  const [formData, setFormData] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
    if (success) setSuccess('');
  };

  const resetForm = () => {
    setFormData(initialValues);
    setError('');
    setSuccess('');
  };

  return {
    formData,
    loading,
    error,
    success,
    handleChange,
    setLoading,
    setError,
    setSuccess,
    resetForm
  };
};