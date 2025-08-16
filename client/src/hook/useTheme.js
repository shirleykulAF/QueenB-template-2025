import { createTheme } from '@mui/material/styles';

export const useTheme = () => {
  // Create a custom theme for QueenB with Peachy Delight colors
  const theme = createTheme({
    palette: {
      primary: {
        main: '#FF99AA', // Rose Pink - main brand color
        light: '#FFC0CB', // Soft Pink - lighter variations
        dark: '#8B6B7B',  // Dusty Rose - deeper accents
      },
      secondary: {
        main: '#C8D8D0', // Light Green/Sage - complementary color
        light: '#FCE8D6', // Creamy Peach - warm background
        dark: '#8B6B7B',  // Dusty Rose - for depth
      },
      background: {
        default: '#FCE8D6', // Creamy Peach - gentle background
        paper: '#FFFFFF',   // Pure white for cards
      },
      text: {
        primary: '#5D4E4E',   // Soft dark brown for main text
        secondary: '#8B6B7B', // Dusty rose for secondary text
      },
    },
    typography: {
      fontFamily: '"Inter", "Poppins", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 300,        // Light and elegant
        fontSize: '3.5rem',
        letterSpacing: '-0.02em',
        lineHeight: 1.2,
      },
      h2: {
        fontWeight: 400,        // Regular weight
        fontSize: '2.5rem',
        letterSpacing: '-0.01em',
        lineHeight: 1.3,
      },
      h3: {
        fontWeight: 500,        // Medium weight
        fontSize: '2rem',
        letterSpacing: '0em',
        lineHeight: 1.4,
      },
      h4: {
        fontWeight: 500,
        fontSize: '1.5rem',
        letterSpacing: '0.01em',
      },
      h5: {
        fontWeight: 500,
        fontSize: '1.25rem',
        letterSpacing: '0.01em',
      },
      h6: {
        fontWeight: 500,
        fontSize: '1.125rem',
        letterSpacing: '0.01em',
      },
      body1: {
        fontWeight: 400,
        fontSize: '1rem',
        lineHeight: 1.6,
        letterSpacing: '0.01em',
      },
      body2: {
        fontWeight: 400,
        fontSize: '0.875rem',
        lineHeight: 1.5,
        letterSpacing: '0.01em',
      },
      button: {
        fontWeight: 500,
        fontSize: '0.875rem',
        letterSpacing: '0.05em',
        textTransform: 'none',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 20,           // Very rounded, gentle corners
            textTransform: 'none',
            fontWeight: 500,
            padding: '12px 28px',
            fontSize: '0.95rem',
            boxShadow: '0 4px 16px rgba(139, 107, 123, 0.15)', // Soft shadow with theme color
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 24px rgba(139, 107, 123, 0.25)',
            },
          },
          contained: {
            background: 'linear-gradient(135deg, #FF99AA 0%, #FFC0CB 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #FFC0CB 0%, #FF99AA 100%)',
            },
          },
          outlined: {
            borderColor: '#FF99AA',
            color: '#FF99AA',
            '&:hover': {
              backgroundColor: 'rgba(255, 153, 170, 0.08)',
              borderColor: '#FFC0CB',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 24,           // Very rounded, gentle corners
            boxShadow: '0 8px 32px rgba(139, 107, 123, 0.12)', // Soft, gentle shadow
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 16px 48px rgba(139, 107, 123, 0.2)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            boxShadow: '0 4px 20px rgba(139, 107, 123, 0.1)',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 16,
              '& fieldset': {
                borderColor: 'rgba(139, 107, 123, 0.3)',
                borderWidth: '1.5px',
              },
              '&:hover fieldset': {
                borderColor: '#FF99AA',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#FF99AA',
                borderWidth: '2px',
              },
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(139, 107, 123, 0.3)',
              borderWidth: '1.5px',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FF99AA',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FF99AA',
              borderWidth: '2px',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: 'linear-gradient(135deg, #FF99AA 0%, #FFC0CB 100%)',
            boxShadow: '0 4px 20px rgba(139, 107, 123, 0.15)',
          },
        },
      },
    },
    shape: {
      borderRadius: 16, // Default border radius for components
    },
    shadows: [
      'none',
      '0 2px 8px rgba(139, 107, 123, 0.08)',
      '0 4px 16px rgba(139, 107, 123, 0.12)',
      '0 8px 24px rgba(139, 107, 123, 0.16)',
      '0 12px 32px rgba(139, 107, 123, 0.2)',
      // ... rest of shadows with theme colors
    ],
  });

  return theme;
};
