import { useState } from 'react';

export const useFormState = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData(initialState);
    setError('');
    setSuccess('');
  };

  const updateFormData = (newData) => {
    setFormData(newData);
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
    resetForm,
    setFormData: updateFormData 
  };
};