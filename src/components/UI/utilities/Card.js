import Box from "@mui/material/Box";

const Card = ({ children }) => {
  return (
    <Box sx={{ bgcolor: "#fff", borderRadius: 1, p: "20px 15px" }}>
      {children}
    </Box>
  );
};

export default Card;
