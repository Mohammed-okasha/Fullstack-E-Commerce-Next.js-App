import { useSelector } from "react-redux";
import { selectCartState } from "@/store/slices/cart-slice";
import CartList from "./CartList";
import CartSummary from "./CartSummary";
import { EmptyBox } from "../UI";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";

const CartContent = () => {
  const { items, totalCartItems, totalCartAmount } =
    useSelector(selectCartState);

  const cartHasItems = items.length > 0;

  if (!cartHasItems) {
    return (
      <EmptyBox
        title="cart"
        icon={
          <ShoppingCartIcon
            sx={{ width: "8rem", height: "8rem", color: "primary.main" }}
          />
        }
      />
    );
  }

  return (
    <>
      <CartList items={items} totalItems={totalCartItems} />
      <CartSummary totalAmount={totalCartAmount} />
    </>
  );
};

export default CartContent;
