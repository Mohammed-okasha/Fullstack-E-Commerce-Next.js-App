import { Formik, Form } from "formik";
import { Input, PasswordField, FormText } from "@/components/UI";
import Button from "@mui/material/Button";
import { loginSchema } from "@/utils/validation-rules";

const loginFormValues = {
  email: "",
  password: "",
};
//========================================================
const LoginForm = ({ onUserLogin }) => {
  const submitHandler = async (values, { resetForm }) => {
    await onUserLogin(values);

    resetForm();
  };

  return (
    <Formik
      initialValues={loginFormValues}
      validationSchema={loginSchema}
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
        <Form onSubmit={handleSubmit}>
          <Input
            input={{
              type: "text",
              name: "email",
              placeholder: "enter your email",
              value: values.email,
              onChange: handleChange,
              onBlur: handleBlur,
            }}
            isTouched={touched.email}
            errors={errors.email}
          />
          <PasswordField
            input={{
              name: "password",
              placeholder: "enter your password",
              value: values.password,
              onChange: handleChange,
              onBlur: handleBlur,
            }}
            isTouched={touched.password}
            errors={errors.password}
          />
          <FormText
            text="don't have an account?"
            path="/account/signup"
            pathName="create account"
            justifyContent="center"
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ py: 1, mb: 2 }}
            fullWidth
          >
            log in
          </Button>

          <FormText
            path="/account/forgot-password"
            pathName="forgot password?"
            justifyContent="center"
          />
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
