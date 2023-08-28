import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "@/hooks/use-http";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CardHeader from "./CardHeader";
import CartIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { Spinner } from "../UI";
import { userNotification } from "@/utils/notifications";
import { selectAuthState } from "@/store/slices/auth-slice";
import { cartActions } from "@/store/slices/cart-slice";
//===========================================================================
const ProductCard = ({ product }) => {
  const { session } = useSelector(selectAuthState);
  const { loading, sendRequest: sendProductData } = useHttp();
  const dispatch = useDispatch();
  const priceFormat = product.price ? product.price.toFixed(2) : null;

  const addProductToCart = async () => {
    const createdProduct = { ...product, quantity: 1 };

    if (session) {
      try {
        const result = await sendProductData({
          url: "/api/cart",
          method: "POST",
          body: createdProduct,
          headers: { "Content-Type": "application/json" },
        });

        dispatch(cartActions.ADD_TO_CART(result.product));
        userNotification("success", result.message);
      } catch (error) {
        userNotification("error", error.message);
      }

      return;
    }

    dispatch(cartActions.ADD_TO_CART(createdProduct));
    userNotification("success", "item added to cart");
  };

  return (
    <Box border="1px solid #ccc" borderRadius="4px" bgcolor="#fff">
      <CardHeader product={product} />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={1}
        p="0 1rem 1rem"
      >
        <Typography variant="h6">
          <del style={{ color: "#db0000" }}> ${priceFormat}</del>
          <br />
          {product.newPrice && <ins>${product.newPrice}</ins>}
        </Typography>
        <Button
          variant="contained"
          sx={{ minWidth: 50 }}
          onClick={addProductToCart}
        >
          {!loading ? <CartIcon /> : <Spinner />}
        </Button>
      </Stack>
    </Box>
  );
};

export default ProductCard;
