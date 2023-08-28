import Box from "@mui/material/Box";

const Backdrop = ({ onClose }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        bgcolor: "rgba(148, 148, 148, 0.587)",
        backdropFilter: " blur(2px) saturate(180%)",
        transition: ".3s",
        zIndex: 250,
      }}
      onClick={onClose}
    />
  );
};

export default Backdrop;
