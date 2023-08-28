import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHttp } from "@/hooks/use-http";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Spinner } from "@/components/UI";
import { selectAuthState } from "@/store/slices/auth-slice";
import { cartActions } from "@/store/slices/cart-slice";
import { userNotification } from "@/utils/notifications";
//===============================================================
const ProductActions = ({ product }) => {
  const { session } = useSelector(selectAuthState);
  const { loading, sendRequest } = useHttp();
  const [productQuantity, setProductQuantity] = useState(1);
  const quantityIsOne = productQuantity === 1;
  const dispatch = useDispatch();

  const increaseProductQuantity = () =>
    setProductQuantity((prevQuantity) => prevQuantity + 1);

  const decreaseProductQuantity = () =>
    setProductQuantity((prevQuantity) => prevQuantity - 1);

  const addProductToCart = async () => {
    const createdProduct = { ...product, quantity: productQuantity };

    if (session) {
      try {
        const result = await sendRequest({
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
    <Box mt={2}>
      <Stack direction="row" alignItems="center" gap={2} mb={3}>
        <Button
          type="button"
          variant="contained"
          sx={{ minWidth: "40px", px: "6px" }}
          disabled={quantityIsOne}
          onClick={decreaseProductQuantity}
        >
          <RemoveIcon />
        </Button>
        <Typography variant="body1">{productQuantity}</Typography>
        <Button
          type="button"
          variant="contained"
          sx={{ minWidth: "40px", px: "6px" }}
          onClick={increaseProductQuantity}
        >
          <AddIcon />
        </Button>
      </Stack>
      <Button
        type="button"
        variant="contained"
        size="large"
        onClick={addProductToCart}
      >
        {!loading ? "add to cart" : <Spinner />}
      </Button>
    </Box>
  );
};

export default ProductActions;
