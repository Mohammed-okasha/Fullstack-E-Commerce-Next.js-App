import { createTheme, responsiveFontSizes } from "@mui/material";

export let themeConfig = createTheme({
  palette: {
    primary: { light: "#3382da", main: "#0063d1", dark: "#004fa7" },
    secondary: { light: "#fba167", main: "#f96302", dark: "#953b01" },
    text: { primary: "#202020", secondary: "#363636", light: "#888" },
    background: {
      default: "#f1f1f2",
    },
  },

  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    body1: {
      fontWeight: 600,
    },
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    htmlFontSize: 15,
  },
});

themeConfig = responsiveFontSizes(themeConfig);
