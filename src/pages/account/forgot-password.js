import { useState } from "react";
import { useHttp } from "@/hooks/use-http";
import { Centring } from "@/components/UI";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ForgotPasswordForm } from "@/components/auth";
import ResetPassword from "@/components/modals/ResetPassword";
import { userNotification } from "@/utils/notifications";

const ForgotPasswordPage = () => {
  const [user, setUser] = useState({
    hasAccount: false,
    email: null,
  });

  const { loading, sendRequest } = useHttp();

  const closeResetPassword = () => setUser({ hasAccount: false, email: null });

  const sendEmailHandler = async (userEmail) => {
    try {
      const result = await sendRequest({
        url: "/api/user/forgot-password",
        method: "POST",
        body: { email: userEmail },
        headers: { "Content-Type": "application/json" },
      });

      setUser({ hasAccount: true, email: result.email });
    } catch (error) {
      userNotification("error", error.message);
    }
  };

  return (
    <>
      {user.hasAccount && (
        <ResetPassword
          userEmail={user.email}
          onCloseResetPassword={closeResetPassword}
        />
      )}
      <Centring>
        <Box textAlign="center">
          <Typography variant="h4">Forgot your password?</Typography>
          <Typography variant="h6" pt={1} color="primary.main">
            Enter your email address so you can reset your password
          </Typography>
        </Box>
        <Box mt={3}>
          <ForgotPasswordForm
            onSendEmail={sendEmailHandler}
            loading={loading}
          />
        </Box>
      </Centring>
    </>
  );
};

export default ForgotPasswordPage;
