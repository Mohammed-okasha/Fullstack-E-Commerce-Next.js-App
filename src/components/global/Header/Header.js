import { useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import DesktopNavbar from "./DesktopNavbar";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "./Logo";
import AppDrawer from "./Drawer";
import HeaderButtons from "./HeaderButtons";
import { selectAuthState } from "@/store/slices/auth-slice";
//===============================================================
function Header() {
  const { session } = useSelector(selectAuthState);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 767px)");

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <Box
      sx={{ display: "flex", position: "sticky", top: 0, left: 0, zIndex: 200 }}
    >
      <AppBar
        component="nav"
        sx={{
          backgroundColor: "#fff",
          boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.1)",
          position: "static",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              minHeight: { sm: "unset" },
              py: 1,
              px: { xs: 0 },
              justifyContent: "space-between",
            }}
          >
            <Logo />

            {isSmallScreen && (
              <IconButton
                onClick={handleDrawerToggle}
                sx={{
                  mr: 2,
                  "& svg": { fontSize: "2.6rem" },
                  color: "#202020",
                }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {!isSmallScreen && <DesktopNavbar session={session} />}
            <HeaderButtons session={session} />
          </Toolbar>
        </Container>
      </AppBar>

      {isSmallScreen && (
        <Box component="nav">
          <AppDrawer
            mobileIsOpen={mobileOpen}
            onDrawerToggle={handleDrawerToggle}
            session={session}
          />
        </Box>
      )}
    </Box>
  );
}

Header.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Header;
