import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import classes from "./Input.module.scss";

const PasswordField = (props) => {
  const { input, isTouched, errors } = props;
  const [passwordIsShown, setPasswordIsShown] = useState(false);

  const errorClass = isTouched && errors ? classes.invalid : "";
  const inputClasses = `${classes.input} ${classes.password}`;

  const toggleShowPassword = () =>
    setPasswordIsShown((prevState) => !prevState);

  const inputType = !passwordIsShown ? "password" : "type";

  return (
    <Box mb="20px">
      <Stack
        direction="row"
        border="1px solid #cecece"
        borderRadius={1}
        className={errorClass}
      >
        <input {...input} type={inputType} className={inputClasses} />
        <Button
          variant="contained"
          size="small"
          sx={{ minWidth: 40 }}
          onClick={toggleShowPassword}
        >
          {!passwordIsShown && <RemoveRedEyeIcon />}
          {passwordIsShown && <VisibilityOffIcon />}
        </Button>
      </Stack>

      {isTouched && errors && <p className={classes.errorMsg}>{errors}</p>}
    </Box>
  );
};

export default PasswordField;
