import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CartItem from "./CartItem";

const CartList = ({ items, totalItems }) => {
  return (
    <Box
      sx={{
        bgcolor: "#fff",
        boxShadow: "0 0 3px 0 rgba(0, 0, 0, .1)",
        borderRadius: 1,
      }}
    >
      <Typography variant="h4" mb={2} p="16px" borderBottom="1px solid #f1f1f2">
        cart ({totalItems})
      </Typography>
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </Box>
  );
};

export default CartList;
