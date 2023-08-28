import Box from "@mui/material/Box";
import classes from "./Input.module.scss";

const Input = (props) => {
  const { input, isTouched, errors } = props;

  const inputClasses =
    isTouched && errors ? `${classes.input} ${classes.invalid}` : classes.input;

  return (
    <Box mb="20px">
      <input {...input} className={inputClasses} />
      {isTouched && errors && <p className={classes.errorMsg}>{errors}</p>}
    </Box>
  );
};

export default Input;
