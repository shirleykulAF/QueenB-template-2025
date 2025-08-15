export const useFormValidation = () => {

    const validateRequired = (fields, formData) => {
    const missing = fields.filter(field => !formData[field]);
    if (missing.length > 0) {
      return `required fields: ${missing.join(', ')}`;
    }
    return null;
  };

  const validateEmail = (email) => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Invalid email format';
    }
    return null;
  };

  const isValidImageUrl = (url) => {
    try {
      new URL(url);
      return /\.(jpg|jpeg|png|gif|webp)$/i.test(url) || 
             url.includes('imgur') || 
             url.includes('cloudinary') || 
             url.includes('unsplash');
    } catch {
      return false;
    }
  };

  const validateImageUrl = (url) => {
    if (url && !isValidImageUrl(url)) {
      return 'Invalid image URL format';
    }
    return null;
  };

  return {
    validateRequired,
    validateEmail,
    validateImageUrl
  };
};