import { useHttp } from "@/hooks/use-http";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ProductPrice from "../products/ProductPrice";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Spinner } from "../UI";
import { cartActions } from "@/store/slices/cart-slice";
import { selectAuthState } from "@/store/slices/auth-slice";
import { userNotification } from "@/utils/notifications";
//==========================================================================
const ActionButtons = (props) => {
  const { session } = useSelector(selectAuthState);
  const { loading, sendRequest } = useHttp();
  const dispatch = useDispatch();
  const { id, price, percentage, newPrice, quantity } = props;
  const quantityEqualOne = quantity === 1;

  const increaseItemQuantity = async () => {
    if (session) {
      try {
        const result = await sendRequest({
          url: `/api/cart/${id}`,
          method: "PUT",
          body: { quantity: quantity + 1 },
          headers: { "Content-Type": "application/json" },
        });

        dispatch(cartActions.ADD_TO_CART({ id: id, quantity: 1 }));
        userNotification("success", result.message);
      } catch (error) {
        userNotification("error", error.message);
      }

      return;
    }

    dispatch(cartActions.ADD_TO_CART({ id: id, quantity: 1 }));
    userNotification("success", "item quantity updated");
  };

  const decreaseItemQuantity = async () => {
    if (session) {
      try {
        const result = await sendRequest({
          url: `/api/cart/${id}`,
          method: "PUT",
          body: { quantity: quantity - 1 },
          headers: { "Content-Type": "application/json" },
        });

        dispatch(cartActions.DECREASE_ITEM_QUANTITY(id));
        userNotification("success", result.message);
      } catch (error) {
        userNotification("error", error.message);
      }

      return;
    }

    dispatch(cartActions.DECREASE_ITEM_QUANTITY(id));
    userNotification("success", "item quantity updated");
  };

  return (
    <Box>
      <ProductPrice
        price={price}
        newPrice={newPrice}
        percentage={percentage}
        isCartPrice={true}
      />
      <Stack
        direction="row"
        alignItems="center"
        gap={2}
        sx={{ "& .MuiButton-root": { minWidth: "35px", px: "6px" } }}
      >
        <Button
          variant="contained"
          size="small"
          disabled={quantityEqualOne}
          onClick={decreaseItemQuantity}
        >
          <RemoveIcon />
        </Button>
        <Typography variant="body1" component="div" display="flex">
          {!loading ? quantity : <Spinner colored={true} />}
        </Typography>
        <Button variant="contained" size="small" onClick={increaseItemQuantity}>
          <AddIcon />
        </Button>
      </Stack>
    </Box>
  );
};

export default ActionButtons;
