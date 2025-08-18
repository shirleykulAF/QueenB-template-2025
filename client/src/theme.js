import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#86007C",
      light: "#EFA1E2",
      dark: "#4D3A4D",
    },
    secondary: {
      main: "#EFA1E2",
      light: "#FBF4D7",
      dark: "#86007C",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#4D3A4D",
      secondary: "#86007C",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h4: {
      fontWeight: 600,
      color: "#4D3A4D",
    },
    h6: {
      fontWeight: 500,
      color: "#FFFFFF",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "linear-gradient(135deg, #86007C 0%, #EFA1E2 100%)",
          boxShadow: "0 4px 20px rgba(134, 0, 124, 0.3)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 500,
        },
        contained: {
          background: "linear-gradient(135deg, #86007C 0%, #EFA1E2 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #4D3A4D 0%, #86007C 100%)",
          },
        },
      },
    },
  },
});