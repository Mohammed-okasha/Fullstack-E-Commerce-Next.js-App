import { Formik, Form } from "formik";
import { Input, Spinner } from "@/components/UI";
import Button from "@mui/material/Button";
import { forgotPasswordSchema } from "@/utils/validation-rules";

const ForgotPasswordValues = {
  email: "",
};

const ForgotPasswordForm = ({ onSendEmail, loading }) => {
  const submitHandler = async (values, { resetForm }) => {
    await onSendEmail(values.email);
    resetForm();
  };

  return (
    <Formik
      initialValues={ForgotPasswordValues}
      validationSchema={forgotPasswordSchema}
      onSubmit={submitHandler}
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
            <Button type="submit" variant="contained" size="large" fullWidth>
              {!loading ? "submit email" : <Spinner />}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ForgotPasswordForm;
