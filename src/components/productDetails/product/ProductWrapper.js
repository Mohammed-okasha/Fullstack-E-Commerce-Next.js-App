import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ImageBlock from "./ImageBlock";
import DetailsBlock from "./DetailsBlock";

const ProductWrapper = () => {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ImageBlock />
        </Grid>
        <Grid item xs={12} md={6}>
          <DetailsBlock />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductWrapper;
