// client/src/hook/useFormValidation.js
// Custom hook for form validation - reusable across all forms

import { useState, useCallback } from 'react';
import { 
  validateEmail, 
  getEmailError, 
  validatePassword, 
  getPasswordError,
  validateRequired,
  validatePhone,
  getPhoneError
} from '../utils/validation';

export const useFormValidation = (initialData = {}) => {
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const [success, setSuccess] = useState('');

  // Clear all errors
  const clearErrors = useCallback(() => {
    setFieldErrors({});
    setGeneralError('');
    setSuccess('');
  }, []);

  // Clear specific field error
  const clearFieldError = useCallback((fieldName) => {
    setFieldErrors(prev => ({ ...prev, [fieldName]: undefined }));
  }, []);

  // Set field-specific error
  const setFieldError = useCallback((fieldName, error) => {
    setFieldErrors(prev => ({ ...prev, [fieldName]: error }));
  }, []);

  // Set general error
  const setError = useCallback((error) => {
    setGeneralError(error);
    setSuccess('');
  }, []);

  // Set success message
  const setSuccessMessage = useCallback((message) => {
    setSuccess(message);
    setGeneralError('');
  }, []);

  // Validate email field
  const validateEmailField = useCallback((email) => {
    const error = getEmailError(email);
    if (error) {
      setFieldError('email', error);
      return false;
    }
    clearFieldError('email');
    return true;
  }, [setFieldError, clearFieldError]);

  // Validate password field
  const validatePasswordField = useCallback((password) => {
    const error = getPasswordError(password);
    if (error) {
      setFieldError('password', error);
      return false;
    }
    clearFieldError('password');
    return true;
  }, [setFieldError, clearFieldError]);

  // Validate required field
  const validateRequiredField = useCallback((value, fieldName) => {
    const error = validateRequired(value, fieldName);
    if (error) {
      setFieldError(fieldName, error);
      return false;
    }
    clearFieldError(fieldName);
    return true;
  }, [setFieldError, clearFieldError]);

  // Validate phone field
  const validatePhoneField = useCallback((phone) => {
    const error = getPhoneError(phone);
    if (error) {
      setFieldError('phone', error);
      return false;
    }
    clearFieldError('phone');
    return true;
  }, [setFieldError, clearFieldError]);

  // Check if form has any errors
  const hasErrors = useCallback(() => {
    // Check if any field has an actual error message (not undefined)
    const hasFieldErrors = Object.values(fieldErrors).some(error => error && error.length > 0);
    // Check if there's a general error
    const hasGeneralError = generalError && generalError.length > 0;
    
    return hasFieldErrors || hasGeneralError;
  }, [fieldErrors, generalError]);

  // Get all current errors
  const getAllErrors = useCallback(() => {
    return { ...fieldErrors, general: generalError };
  }, [fieldErrors, generalError]);

  return {
    // State
    fieldErrors,
    generalError,
    success,
    
    // Actions
    clearErrors,
    clearFieldError,
    setFieldError,
    setError,
    setSuccessMessage,
    
    // Validation functions
    validateEmailField,
    validatePasswordField,
    validateRequiredField,
    validatePhoneField,
    
    // Utility functions
    hasErrors,
    getAllErrors
  };
};
