import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Poppins,sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: "600",
    },
  },
  palette: {
    primary: {
      main: "#fff",
    },
    secondary: {
      main: "#d19c97",
    },
    info: {
      main: "#1c1c1c",
    },
    grey: {
      main: "#9BA4B5",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  // ... other theme options ...
});

export default theme;
