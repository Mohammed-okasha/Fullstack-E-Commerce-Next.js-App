import { useHttp } from "@/hooks/use-http";
import { useRouter } from "next/router";
import { Modal, Card } from "../UI";
import Typography from "@mui/material/Typography";
import { ResetPasswordForm } from "../auth";
import { userNotification } from "@/utils/notifications";

const ResetPassword = (props) => {
  const { userEmail, onCloseResetPassword } = props;
  const { loading, sendRequest } = useHttp();
  const { replace } = useRouter();

  const resetPasswordHandler = async (newPassword) => {
    try {
      const result = await sendRequest({
        url: "/api/user/forgot-password",
        method: "PUT",
        body: { email: userEmail, password: newPassword },
        headers: { "Content-Type": "application/json" },
      });

      userNotification("success", result.message);
      replace("/account/login");
    } catch (error) {
      userNotification("error", error.message);
    }
  };

  return (
    <Modal onCloseModal={onCloseResetPassword}>
      <Card>
        <Typography variant="h5" textAlign="center" mb={3}>
          reset your password
        </Typography>
        <ResetPasswordForm
          onResetPassword={resetPasswordHandler}
          loading={loading}
        />
      </Card>
    </Modal>
  );
};

export default ResetPassword;
