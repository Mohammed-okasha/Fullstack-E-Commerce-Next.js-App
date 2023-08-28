import classes from "./Loaders.module.scss";

const Spinner = ({ colored }) => {
  const spinnerClasses = colored
    ? `${classes["lds-dual-ring"]} ${classes.colored}`
    : classes["lds-dual-ring"];

  return <div className={spinnerClasses}></div>;
};

export default Spinner;
