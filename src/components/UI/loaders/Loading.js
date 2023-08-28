import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import classes from "./Loaders.module.scss";

const Loading = () => {
  const [mounting, setMounting] = useState(false);

  useEffect(() => {
    setMounting(true);

    return () => setMounting(false);
  }, []);

  if (!mounting) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className={classes.backdrop}>
      <div className={classes.spinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>,
    document.getElementById("loaders")
  );
};

export default Loading;
