import * as Yup from "yup";

const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i;

const emailValidateRules = Yup.string()
  .matches(emailRegEx, "please enter a valid email!")
  .required("name required!");

const passwordValidateRules = Yup.string()
  .min(8, "password at least 8 characters!")
  .max(40, "password is too long!")
  .required("password required!");

export const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "name at least 3 characters!")
    .max(40, "name is too long!")
    .required("name required!"),
  email: emailValidateRules,
  password: passwordValidateRules,
});

export const loginSchema = Yup.object().shape({
  email: emailValidateRules,
  password: passwordValidateRules,
});

export const changePasswordSchema = Yup.object().shape({
  newPassword: passwordValidateRules,
  oldPassword: passwordValidateRules,
});
//========================================================================
export function validateEmail(email) {
  return emailRegEx.test(String(email).trim().toLowerCase());
}

export const validatePassword = (password) =>
  password.trim().length >= 8 && password.trim().length <= 40;
