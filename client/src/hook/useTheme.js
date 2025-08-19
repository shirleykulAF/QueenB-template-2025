import { createTheme } from '@mui/material/styles';

export const useTheme = () => {
  return createTheme({
    palette: {
      primary: {
        main: '#E8B4B8', // Gentle dusty rose
        light: '#F4D1D4', // Light soft pink
        dark: '#C4848A', // Deeper dusty rose
        contrastText: '#2C1810', // Dark brown for contrast
      },
      secondary: {
        main: '#B8D4E3', // Soft blue-gray instead of dark purple
        light: '#D4E6F1', // Light blue-gray
        dark: '#9BC2D4', // Medium blue-gray
        contrastText: '#2C1810',
      },
      text: {
        primary: '#2C1810', // Rich dark brown
        secondary: '#6B4F4F', // Muted brown-gray
      },
      background: {
        default: '#FEFCF8', // Very light warm white
        paper: '#FFFFFF', // Pure white
      },
      success: {
        main: '#9CAF88', // Gentle sage green
        light: '#C8D5B9',
        dark: '#7A8F6A',
      },
      error: {
        main: '#D4A5A5', // Gentle dusty red
        light: '#E8C7C7',
        dark: '#B88A8A',
      },
      warning: {
        main: '#E6C27D', // Gentle gold
        light: '#F0D4A3',
        dark: '#D4B06A',
      },
      info: {
        main: '#B8C5D6', // Gentle blue-gray
        light: '#D1DCE8',
        dark: '#9BA8B8',
      },
    },
    typography: {
      fontFamily: [
        '"Nunito"',
        '"Segoe UI"',
        '"Roboto"',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif'
      ].join(','),
      h1: {
        fontFamily: '"Nunito", sans-serif',
        fontWeight: 600,
        fontSize: '2.5rem',
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
        color: '#2C1810',
      },
      h2: {
        fontFamily: '"Nunito", sans-serif',
        fontWeight: 600,
        fontSize: '2rem',
        lineHeight: 1.3,
        letterSpacing: '-0.01em',
        color: '#2C1810',
      },
      h3: {
        fontFamily: '"Nunito", sans-serif',
        fontWeight: 600,
        fontSize: '1.75rem',
        lineHeight: 1.3,
        letterSpacing: '-0.01em',
        color: '#2C1810',
      },
      h4: {
        fontFamily: '"Nunito", sans-serif',
        fontWeight: 500,
        fontSize: '1.5rem',
        lineHeight: 1.4,
        color: '#2C1810',
      },
      h5: {
        fontFamily: '"Nunito", sans-serif',
        fontWeight: 500,
        fontSize: '1.25rem',
        lineHeight: 1.4,
        color: '#2C1810',
      },
      h6: {
        fontFamily: '"Nunito", sans-serif',
        fontWeight: 500,
        fontSize: '1.125rem',
        lineHeight: 1.4,
        color: '#2C1810',
      },
      body1: {
        fontFamily: '"Nunito", sans-serif',
        fontWeight: 400,
        fontSize: '1rem',
        lineHeight: 1.6,
        color: '#2C1810',
      },
      body2: {
        fontFamily: '"Nunito", sans-serif',
        fontWeight: 400,
        fontSize: '0.875rem',
        lineHeight: 1.6,
        color: '#6B4F4F',
      },
      button: {
        fontFamily: '"Nunito", sans-serif',
        fontWeight: 500,
        fontSize: '0.875rem',
        lineHeight: 1.5,
        textTransform: 'none',
        letterSpacing: '0.01em',
      },
      caption: {
        fontFamily: '"Nunito", sans-serif',
        fontWeight: 400,
        fontSize: '0.75rem',
        lineHeight: 1.4,
        color: '#6B4F4F',
      },
      overline: {
        fontFamily: '"Nunito", sans-serif',
        fontWeight: 500,
        fontSize: '0.75rem',
        lineHeight: 1.4,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: '#6B4F4F',
      },
    },
    shape: {
      borderRadius: 12, // Slightly more rounded corners
    },
    shadows: [
      'none',
      '0 1px 3px rgba(44, 24, 16, 0.05), 0 1px 2px rgba(44, 24, 16, 0.1)',
      '0 2px 6px rgba(44, 24, 16, 0.08), 0 1px 4px rgba(44, 24, 16, 0.12)',
      '0 4px 12px rgba(44, 24, 16, 0.1), 0 2px 6px rgba(44, 24, 16, 0.15)',
      '0 6px 20px rgba(44, 24, 16, 0.12), 0 3px 10px rgba(44, 24, 16, 0.18)',
      '0 8px 28px rgba(44, 24, 16, 0.14), 0 4px 14px rgba(44, 24, 16, 0.2)',
      '0 10px 36px rgba(44, 24, 16, 0.16), 0 5px 18px rgba(44, 24, 16, 0.22)',
      '0 12px 44px rgba(44, 24, 16, 0.18), 0 6px 22px rgba(44, 24, 16, 0.24)',
      '0 14px 52px rgba(44, 24, 16, 0.2), 0 7px 26px rgba(44, 24, 16, 0.26)',
      '0 16px 60px rgba(44, 24, 16, 0.22), 0 8px 30px rgba(44, 24, 16, 0.28)',
      '0 18px 68px rgba(44, 24, 16, 0.24), 0 9px 34px rgba(44, 24, 16, 0.3)',
      '0 20px 76px rgba(44, 24, 16, 0.26), 0 10px 38px rgba(44, 24, 16, 0.32)',
      '0 22px 84px rgba(44, 24, 16, 0.28), 0 11px 42px rgba(44, 24, 16, 0.34)',
      '0 24px 92px rgba(44, 24, 16, 0.3), 0 12px 46px rgba(44, 24, 16, 0.36)',
      '0 26px 100px rgba(44, 24, 16, 0.32), 0 13px 50px rgba(44, 24, 16, 0.38)',
      '0 28px 108px rgba(44, 24, 16, 0.34), 0 14px 54px rgba(44, 24, 16, 0.4)',
      '0 30px 116px rgba(44, 24, 16, 0.36), 0 15px 58px rgba(44, 24, 16, 0.42)',
      '0 32px 124px rgba(44, 24, 16, 0.38), 0 16px 62px rgba(44, 24, 16, 0.44)',
      '0 34px 132px rgba(44, 24, 16, 0.4), 0 17px 66px rgba(44, 24, 16, 0.46)',
      '0 36px 140px rgba(44, 24, 16, 0.42), 0 18px 70px rgba(44, 24, 16, 0.48)',
      '0 38px 148px rgba(44, 24, 16, 0.44), 0 19px 74px rgba(44, 24, 16, 0.5)',
      '0 40px 156px rgba(44, 24, 16, 0.46), 0 20px 78px rgba(44, 24, 16, 0.52)',
      '0 42px 164px rgba(44, 24, 16, 0.48), 0 21px 82px rgba(44, 24, 16, 0.54)',
      '0 44px 172px rgba(44, 24, 16, 0.5), 0 22px 86px rgba(44, 24, 16, 0.56)',
      '0 46px 180px rgba(44, 24, 16, 0.52), 0 23px 90px rgba(44, 24, 16, 0.58)',
      '0 48px 188px rgba(44, 24, 16, 0.54), 0 24px 94px rgba(44, 24, 16, 0.6)',
    ],
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 500,
            boxShadow: '0 2px 8px rgba(44, 24, 16, 0.1)',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              boxShadow: '0 4px 16px rgba(44, 24, 16, 0.15)',
              transform: 'translateY(-1px)',
            },
          },
          contained: {
            '&:hover': {
              boxShadow: '0 6px 20px rgba(44, 24, 16, 0.2)',
            },
          },
          outlined: {
            borderWidth: 2,
            '&:hover': {
              borderWidth: 2,
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#E8B4B8',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#C4848A',
                borderWidth: 2,
              },
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: '0 4px 20px rgba(44, 24, 16, 0.08)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 2px 12px rgba(44, 24, 16, 0.06)',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              boxShadow: '0 4px 20px rgba(44, 24, 16, 0.1)',
              transform: 'translateY(-2px)',
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            fontWeight: 500,
          },
        },
      },
    },
  });
};
