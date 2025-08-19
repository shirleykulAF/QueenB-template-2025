// client/src/utils/validation.js
// Reusable validation utilities for the entire application

// Email validation regex (same as server will use)
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Validate email format
export const validateEmail = (email) => {
  if (!email) return false;
  return EMAIL_REGEX.test(email.trim());
};

// Get email error message
export const getEmailError = (email) => {
  if (!email) return 'Email is required';
  if (!validateEmail(email)) return 'Please enter a valid email address';
  return null;
};

// Password validation
export const validatePassword = (password) => {
  if (!password) return false;
  return password.length >= 6;
};

// Get password error message
export const getPasswordError = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 6) return 'Password must be at least 6 characters';
  return null;
};

// Required field validation
export const validateRequired = (value, fieldName) => {
  if (!value || !value.trim()) {
    return `${fieldName} is required`;
  }
  return null;
};

// Phone validation (basic)
export const validatePhone = (phone) => {
  if (!phone) return false;
  // Basic phone validation - you can make this more sophisticated
  return phone.trim().length >= 8;
};

// Get phone error message
export const getPhoneError = (phone) => {
  if (!phone) return 'Phone number is required';
  if (!validatePhone(phone)) return 'Please enter a valid phone number';
  return null;
};
