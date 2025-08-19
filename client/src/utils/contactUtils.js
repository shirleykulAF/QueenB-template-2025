// Contact utility functions for mentor contact actions

/**
 * Opens WhatsApp chat with the given phone number
 * @param {string} phoneNumber - The phone number to contact
 */
export const openWhatsApp = (phoneNumber) => {
  // Remove all non-digit characters except + for international numbers
  const cleanPhone = phoneNumber.replace(/[^\d+]/g, '');
  
  // Create WhatsApp URL
  const whatsappUrl = `https://wa.me/${cleanPhone}`;
  
  // Open in new tab
  window.open(whatsappUrl, '_blank');
};

/**
 * Copies text to clipboard
 * @param {string} text - The text to copy
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
};

/**
 * Opens LinkedIn profile or search
 * @param {string} linkedinUrl - The LinkedIn URL if available
 * @param {string} fullName - The mentor's full name for search fallback
 */
export const openLinkedIn = (linkedinUrl, fullName) => {
  let url;
  
  if (linkedinUrl) {
    // Use the provided LinkedIn URL
    url = linkedinUrl;
  } else {
    // Create a search URL using the full name
    const encodedName = encodeURIComponent(fullName);
    url = `https://linkedin.com/search/results/people/?keywords=${encodedName}`;
  }
  
  // Open in new tab
  window.open(url, '_blank');
};
