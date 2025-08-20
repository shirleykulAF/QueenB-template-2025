import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#713062", // Plum
      light: "#1E3328", // Dark Forest (changed from Coral)
      dark: "#1E3328", // Dark Forest
    },
    secondary: {
      main: "#1E3328", // Dark Forest (changed from Coral)
      light: "#FCDAC7", // Peach
      dark: "#713062", // Plum
    },
    background: {
      default: "#EAF5E0", // Light Green
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1E3328", // Dark Forest
      secondary: "#B7C8B5", // Sage
    },
    // Custom colors for the design system
    custom: {
      lightGreen: "#EAF5E0",
      peach: "#FCDAC7",
      coral: "#1E3328", // Changed from #F58A75 to Dark Forest
      plum: "#713062",
      darkForest: "#1E3328",
      sage: "#B7C8B5",
    },
  },
  typography: {
    fontFamily: '"Rubik", "Assistant", sans-serif',
    h1: {
      fontSize: "32px",
      fontWeight: 700,
      lineHeight: 1.2,
      color: "#1E3328", // Dark Forest
    },
    h2: {
      fontSize: "26px",
      fontWeight: 700,
      lineHeight: 1.3,
      color: "#1E3328", // Dark Forest
    },
    h3: {
      fontSize: "20px",
      fontWeight: 700,
      lineHeight: 1.4,
      color: "#1E3328", // Dark Forest
    },
    h4: {
      fontSize: "18px",
      fontWeight: 600,
      lineHeight: 1.4,
      color: "#713062", // Plum
    },
    h5: {
      fontSize: "16px",
      fontWeight: 600,
      lineHeight: 1.5,
      color: "#713062", // Plum
    },
    h6: {
      fontSize: "14px",
      fontWeight: 600,
      lineHeight: 1.5,
      color: "#713062", // Plum
    },
    body1: {
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: 1.6,
      color: "#1E3328", // Dark Forest
    },
    body2: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: 1.6,
      color: "#B7C8B5", // Sage
    },
    button: {
      fontSize: "16px",
      fontWeight: 500,
      textTransform: "none",
    },
  },
  spacing: (factor) => `${8 * factor}px`, // 8px base spacing scale
  shape: {
    borderRadius: 12, // 12px border radius for buttons
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#EAF5E0", // Light Green
          boxShadow: "0 2px 8px rgba(30, 51, 40, 0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          fontWeight: 500,
          fontSize: "16px",
          padding: "12px 24px",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        },
        contained: {
          backgroundColor: "#713062", // Plum
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#1E3328", // Dark Forest (changed from Coral)
            transform: "translateY(-1px)",
            boxShadow: "0 4px 12px rgba(113, 48, 98, 0.3)",
          },
          "&:disabled": {
            backgroundColor: "#B7C8B5", // Sage
            color: "#FFFFFF",
          },
        },
        outlined: {
          borderColor: "#1E3328", // Dark Forest (changed from Coral)
          color: "#1E3328", // Dark Forest (changed from Coral)
          "&:hover": {
            backgroundColor: "#1E3328", // Dark Forest (changed from Coral)
            color: "#FFFFFF",
            borderColor: "#1E3328", // Dark Forest (changed from Coral)
          },
        },
        text: {
          color: "#1E3328", // Dark Forest
          "&:hover": {
            backgroundColor: "rgba(30, 51, 40, 0.1)", // Dark Forest with opacity (changed from Coral)
            color: "#1E3328", // Dark Forest (changed from Coral)
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          border: "1px solid #B7C8B5", // Sage
          borderRadius: 16,
          padding: 20,
          boxShadow: "0 2px 8px rgba(30, 51, 40, 0.1)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          borderRadius: 16,
          boxShadow: "0 2px 8px rgba(30, 51, 40, 0.1)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            "& fieldset": {
              borderColor: "#B7C8B5", // Sage
            },
            "&:hover fieldset": {
              borderColor: "#1E3328", // Dark Forest (changed from Coral)
            },
            "&.Mui-focused fieldset": {
              borderColor: "#713062", // Plum
            },
          },
        },
      },
    },
  },
});