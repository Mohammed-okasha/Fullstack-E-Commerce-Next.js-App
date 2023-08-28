import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

const ModalBox = ({ children, onClose }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "500px",
        width: "95%",
        zIndex: 300,
      }}
    >
      <Button
        type="button"
        variant="contained"
        sx={{
          position: "absolute",
          top: -29,
          right: 0,
          minWidth: "40px",
          py: "6px",
        }}
        size="small"
        onClick={onClose}
      >
        <CloseIcon />
      </Button>
      {children}
    </Box>
  );
};

export default ModalBox;
