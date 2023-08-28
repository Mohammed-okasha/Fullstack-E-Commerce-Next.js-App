import { useContext } from "react";
import ProductContext from "@/context/product-details";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ProductPrice from "@/components/products/ProductPrice";
import Rating from "@mui/material/Rating";
import ProductActions from "./ProductActions";

const DetailsBlock = () => {
  const product = useContext(ProductContext);

  return (
    <Box>
      <Box>
        <Typography variant="body1">{product.brand}</Typography>
        <Typography variant="h4" pb={1}>
          {product.title}
        </Typography>
        <Typography variant="body1">{product.description}</Typography>
      </Box>
      <ProductPrice
        price={product.price}
        percentage={product.discountPercentage}
        newPrice={product.newPrice}
      />
      <Rating
        name="product-rating"
        precision={0.5}
        value={product.rating.toString()}
        readOnly
      />
      <ProductActions product={product} />
    </Box>
  );
};

export default DetailsBlock;
