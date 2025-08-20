import { useState, useCallback } from 'react';

export const useMentorProfileForm = (initialUser) => {
  const [formData, setFormData] = useState({
    username: initialUser?.username || '',
    firstName: initialUser?.firstName || '',
    lastName: initialUser?.lastName || '',
    nickname: initialUser?.nickname || '',
    displayName: initialUser?.displayName || '',
    role: initialUser?.role || '',
    email: initialUser?.email || '',
    phone: initialUser?.phone || '',
    whatsapp: initialUser?.whatsapp || '',
    linkedin: initialUser?.linkedin || '',
    website: initialUser?.website || '',
    telegram: initialUser?.telegram || '',
    biography: initialUser?.description || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [passwordVisibility, setPasswordVisibility] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const handleInputChange = useCallback((field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  }, []);

  const handlePasswordVisibility = useCallback((field) => {
    setPasswordVisibility(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      username: initialUser?.username || '',
      firstName: initialUser?.firstName || '',
      lastName: initialUser?.lastName || '',
      nickname: initialUser?.nickname || '',
      displayName: initialUser?.displayName || '',
      role: initialUser?.role || '',
      email: initialUser?.email || '',
      phone: initialUser?.phone || '',
      whatsapp: initialUser?.whatsapp || '',
      linkedin: initialUser?.linkedin || '',
      website: initialUser?.website || '',
      telegram: initialUser?.telegram || '',
      biography: initialUser?.description || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  }, [initialUser]);

  const clearPasswords = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  }, []);

  return {
    formData,
    passwordVisibility,
    handleInputChange,
    handlePasswordVisibility,
    resetForm,
    clearPasswords
  };
};
