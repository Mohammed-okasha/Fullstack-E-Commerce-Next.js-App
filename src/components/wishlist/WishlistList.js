import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ProductCard from "../products/ProductCard";

const WishlistList = ({ items }) => {
  const itemsCount = items.length;

  return (
    <Box>
      <Typography variant="h4" mb={2}>
        wishlist ({itemsCount})
      </Typography>
      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid key={item.id} item xs={6} md={4} lg={3}>
            <ProductCard product={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default WishlistList;
