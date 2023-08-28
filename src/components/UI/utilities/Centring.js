import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const FormHolder = ({ children, title }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        maxWidth: "500px",
        width: "95%",
      }}
    >
      {title && (
        <Typography variant="h4" textAlign="center" mb={3}>
          {title}
        </Typography>
      )}
      {children}
    </Box>
  );
};

export default FormHolder;
