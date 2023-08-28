import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Centring } from "@/components/UI";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { userLogout } from "@/utils/auth";
import { authActions } from "@/store/slices/auth-slice";
import { userNotification } from "@/utils/notifications";
//========================================================================
const UserProfile = ({ session: { user }, onOpenChangePassModal }) => {
  const { replace } = useRouter();
  const dispatch = useDispatch();

  const userName = user.name.slice(0, 1);

  const userLogoutHandler = () => {
    userLogout();

    dispatch(authActions.DEACTIVATE_SESSION());
    userNotification("success", "logged out successfully");
    replace("/account/login");
  };

  return (
    <Centring>
      <Box
        textAlign="center"
        sx={{
          bgcolor: "#fff",
          boxShadow: "0 0 4px rgba(0, 0, 0, 0.1), 0 0 4px rgba(0, 0, 0, 0.1)",
          p: "3rem 1rem",
          borderRadius: 2,
        }}
      >
        <Avatar
          sx={{
            display: "inline-flex",
            bgcolor: "primary.main",
            width: "80px",
            height: "80px",
            fontSize: "2.5rem",
          }}
        >
          {userName}
        </Avatar>
        <Typography variant="h6" mt={1} textTransform="lowercase">
          {user.email}
        </Typography>
        <Stack mt={2} alignItems="center">
          <Button
            type="button"
            variant="contained"
            size="large"
            sx={{ mb: 2 }}
            onClick={userLogoutHandler}
          >
            logout
          </Button>
          <Button type="button" variant="text" onClick={onOpenChangePassModal}>
            change my password
          </Button>
        </Stack>
      </Box>
    </Centring>
  );
};

export default React.memo(UserProfile);
