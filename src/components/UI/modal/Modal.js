import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Backdrop from "./Backdrop";
import ModalBox from "./ModalBox";

const Modal = ({ children, onCloseModal }) => {
  const [mounting, setMounting] = useState(false);

  useEffect(() => {
    setMounting(true);

    return () => setMounting(false);
  }, []);

  if (!mounting) {
    return null;
  }

  const overlays = document.getElementById("overlays");

  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onCloseModal} />, overlays)}
      {ReactDOM.createPortal(
        <ModalBox onClose={onCloseModal}>{children}</ModalBox>,
        overlays
      )}
    </>
  );
};

export default Modal;
