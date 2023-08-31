import { Formik, Form } from "formik";
import { PasswordField, Spinner } from "@/components/UI";
import { resetPasswordSchema } from "@/utils/validation-rules";
import Button from "@mui/material/Button";

const resetPasswordValues = {
  password: "",
};

const ResetPasswordForm = ({ onResetPassword, loading }) => {
  const handleSubmit = async (values, { resetForm }) => {
    await onResetPassword(values.password);
    resetForm();
  };

  return (
    <Formik
      initialValues={resetPasswordValues}
      validationSchema={resetPasswordSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <PasswordField
              input={{
                name: "password",
                placeholder: "enter new password",
                value: values.password,
                onChange: handleChange,
                onBlur: handleBlur,
              }}
              isTouched={touched.password}
              errors={errors.password}
            />

            <Button type="submit" variant="contained" size="large">
              {!loading ? "reset my password" : <Spinner />}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ResetPasswordForm;
