// Avatar options for mentor signup - Customizable UI Avatars
export const avatarOptions = [
  {
    id: 1,
    name: 'Professional Blue',
    url: 'https://ui-avatars.com/api/?name=JD&background=3b82f6&color=fff&size=150&font-size=0.5&bold=true',
    description: 'Clean blue professional style'
  },
  {
    id: 2,
    name: 'Creative Purple',
    url: 'https://ui-avatars.com/api/?name=JD&background=8b5cf6&color=fff&size=150&font-size=0.5&bold=true',
    description: 'Creative purple design'
  },
  {
    id: 3,
    name: 'Tech Green',
    url: 'https://ui-avatars.com/api/?name=JD&background=10b981&color=fff&size=150&font-size=0.5&bold=true',
    description: 'Tech-savvy green style'
  },
  {
    id: 4,
    name: 'Warm Orange',
    url: 'https://ui-avatars.com/api/?name=JD&background=f59e0b&color=fff&size=150&font-size=0.5&bold=true',
    description: 'Warm and friendly orange'
  },
  {
    id: 5,
    name: 'Elegant Gray',
    url: 'https://ui-avatars.com/api/?name=JD&background=6b7280&color=fff&size=150&font-size=0.5&bold=true',
    description: 'Elegant gray professional'
  },
  {
    id: 6,
    name: 'Modern Teal',
    url: 'https://ui-avatars.com/api/?name=JD&background=14b8a6&color=fff&size=150&font-size=0.5&bold=true',
    description: 'Modern teal design'
  },
  {
    id: 7,
    name: 'Bold Red',
    url: 'https://ui-avatars.com/api/?name=JD&background=ef4444&color=fff&size=150&font-size=0.5&bold=true',
    description: 'Bold and confident red'
  },
  {
    id: 8,
    name: 'Soft Pink',
    url: 'https://ui-avatars.com/api/?name=JD&background=ec4899&color=fff&size=150&font-size=0.5&bold=true',
    description: 'Soft and approachable pink'
  }
];

// Default avatar - also customizable
export const defaultAvatar = 'https://ui-avatars.com/api/?name=JD&background=6366f1&color=fff&size=150&font-size=0.5&bold=true';

// Function to generate custom avatar for any user
export const generateCustomAvatar = (firstName, lastName, color = '6366f1') => {
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  return `https://ui-avatars.com/api/?name=${initials}&background=${color}&color=fff&size=150&font-size=0.5&bold=true`;
};
