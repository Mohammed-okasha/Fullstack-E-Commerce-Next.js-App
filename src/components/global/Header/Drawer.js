import Link from "next/link";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { mainPaths } from "@/assets/data/paths";

const AppDrawer = (props) => {
  const { onDrawerToggle, mobileIsOpen, window } = props;

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Drawer
      container={container}
      variant="temporary"
      open={mobileIsOpen}
      onClose={onDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        position: "relative",
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          maxWidth: "300px",
          width: "85%",
          overflow: "initial",
        },
      }}
    >
      <IconButton
        type="button"
        onClick={onDrawerToggle}
        sx={{
          position: "absolute",
          right: "-34px",
          top: "50%",
          transform: "translateY(-50%)",
          bgcolor: "primary.main",
          color: "#fff",
          p: "6px 8px",
          borderRadius: 0,
          "&:hover": {
            bgcolor: "primary.main",
          },
        }}
      >
        <CloseIcon fontSize="medium" />
      </IconButton>
      <Box onClick={onDrawerToggle} sx={{ textAlign: "center" }}>
        <List sx={{ py: 2 }}>
          {mainPaths.map((item) => {
            return (
              <Link key={item.path} href={item.path} className="nav_link">
                <ListItem disablePadding>
                  <ListItemButton sx={{ textAlign: "center" }}>
                    <ListItemText
                      primary={item.title}
                      sx={{ "& .MuiTypography-root": { fontSize: "inherit" } }}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default AppDrawer;
