import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const ProductPrice = (props) => {
  const { price, percentage, newPrice, isCartPrice } = props;

  return (
    <Box mb={3} mt={!isCartPrice && 2}>
      <Stack alignItems={isCartPrice ? "flex-end" : "stretch"}>
        {newPrice && (
          <Typography variant="h5" pb={1}>
            ${newPrice}
          </Typography>
        )}
        <Stack direction="row" alignItems="center" spacing={2}>
          <del>{price.toFixed(2)}</del>
          <Typography
            bgcolor="primary.light"
            color="#fff"
            p="4px 6px"
            borderRadius="4px"
          >
            -{percentage}%
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProductPrice;
