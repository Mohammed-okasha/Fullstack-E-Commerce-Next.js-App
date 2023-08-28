import { Formik, Form } from "formik";
import { Input, PasswordField, FormText } from "@/components/UI";
import Button from "@mui/material/Button";
import { SignupSchema } from "@/utils/validation-rules";

const signupFormValues = {
  name: "",
  email: "",
  password: "",
};
//==================================================================
const SignupForm = ({ onCreateUserAccount }) => {
  const submitHandler = async (values, { resetForm }) => {
    await onCreateUserAccount(values);

    resetForm();
  };

  return (
    <Formik
      initialValues={signupFormValues}
      validationSchema={SignupSchema}
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
              name: "name",
              placeholder: "enter your name",
              value: values.name,
              onChange: handleChange,
              onBlur: handleBlur,
            }}
            isTouched={touched.name}
            errors={errors.name}
          />
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
            text="already have an account?"
            path="/account/login"
            pathName="login"
            justifyContent="center"
          />
          <Button type="submit" variant="contained" sx={{ py: 1 }} fullWidth>
            create an account
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
