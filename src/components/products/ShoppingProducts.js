import { useContext } from "react";
import ProductContext from "@/context/product-details";
import Grid from "@mui/material/Grid";
import ProductCard from "./ProductCard";
import Typography from "@mui/material/Typography";

const ShoppingProducts = () => {
  const {
    products: shopProducts,
    searchValue,
    selectedValue,
  } = useContext(ProductContext);

  const filteredProducts = shopProducts.filter((product) => {
    const { title, category } = product;

    return (
      (searchValue === "" || title.toLowerCase().includes(searchValue)) &&
      (selectedValue === "all" || category === selectedValue)
    );
  });

  if (filteredProducts.length === 0) {
    return (
      <Typography variant="h4" textAlign="center" mt={4}>
        no products found!
      </Typography>
    );
  }

  return (
    <Grid container spacing={2}>
      {filteredProducts.map((product) => (
        <Grid key={product.id} item xs={6} md={4} lg={3}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ShoppingProducts;
