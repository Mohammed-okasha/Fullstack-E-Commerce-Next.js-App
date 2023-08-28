import { Formik, Form } from "formik";
import { Modal, Card, PasswordField, Spinner } from "../UI";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { changePasswordSchema } from "@/utils/validation-rules";

const changePasswordValues = {
  newPassword: "",
  oldPassword: "",
};
//============================================================
const ChangePasswordModal = (props) => {
  const { onCloseChangePassModal, onChangePassword, isLoading } = props;

  const submitHandler = async (values, { resetForm }) => {
    await onChangePassword(values);

    resetForm();
  };

  return (
    <Modal onCloseModal={onCloseChangePassModal}>
      <Card>
        <Typography variant="h4" textAlign="center" mb={2}>
          change password
        </Typography>
        <Formik
          initialValues={changePasswordValues}
          validationSchema={changePasswordSchema}
          onSubmit={submitHandler}
        >
          {({
            values,
            touched,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <Form onSubmit={handleSubmit} style={{ textAlign: "center" }}>
              <PasswordField
                input={{
                  name: "newPassword",
                  placeholder: "enter new password",
                  value: values.newPassword,
                  onChange: handleChange,
                  onBlur: handleBlur,
                }}
                isTouched={touched.newPassword}
                errors={errors.newPassword}
              />
              <PasswordField
                input={{
                  name: "oldPassword",
                  placeholder: "enter old password",
                  value: values.oldPassword,
                  onChange: handleChange,
                  onBlur: handleBlur,
                }}
                isTouched={touched.oldPassword}
                errors={errors.oldPassword}
              />
              <Button type="submit" variant="contained" size="large">
                {!isLoading ? "change password" : <Spinner />}
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Modal>
  );
};

export default ChangePasswordModal;
