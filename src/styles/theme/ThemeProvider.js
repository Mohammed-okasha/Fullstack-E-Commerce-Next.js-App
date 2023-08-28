import { ThemeProvider as Theme, CssBaseline } from "@mui/material";
import { themeConfig } from "./theme-config";

const ThemeProvider = ({ children }) => {
  return (
    <Theme theme={themeConfig}>
      <CssBaseline />
      {children}
    </Theme>
  );
};

export default ThemeProvider;
