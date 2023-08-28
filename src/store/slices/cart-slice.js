import { createSlice } from "@reduxjs/toolkit";
import { saveData, removeData } from "@/utils/helpers";
import { PrintDisabled } from "@mui/icons-material";
// ==================================================================
function getCartValues(cartItems) {
  return cartItems.reduce(
    (values, item) => {
      const { quantity, price, newPrice } = item;
      const totalItemPrice = quantity * newPrice || price;

      values.totalItems += quantity;
      values.totalAmount += totalItemPrice;

      return values;
    },
    {
      totalItems: 0,
      totalAmount: 0,
    }
  );
}
// ==================================================================
const defaultCartState = {
  items: [],
  totalCartItems: "0",
  totalCartAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: defaultCartState,

  reducers: {
    ADD_TO_CART: (state, action) => {
      const product = action.payload;

      const exitingProduct = state.items.find((item) => item.id === product.id);

      if (exitingProduct) {
        const exitingQuantity = exitingProduct.quantity;
        exitingProduct.quantity = exitingQuantity + product.quantity;
      } else {
        state.items.unshift({ ...product });
      }

      const { totalItems, totalAmount } = getCartValues(state.items);

      state.totalCartItems = parseInt(totalItems);
      state.totalCartAmount = parseFloat(totalAmount).toFixed(2);

      saveData("cart", state.items);
    },

    REMOVE_FROM_CART: (state, action) => {
      const productId = action.payload;

      const updatedProducts = state.items.filter(
        (item) => item.id !== productId
      );
      state.items = updatedProducts;

      const { totalItems, totalAmount } = getCartValues(state.items);

      state.totalCartItems = parseInt(totalItems).toString();
      state.totalCartAmount = parseFloat(totalAmount).toFixed(2);

      saveData("cart", state.items);
    },

    DECREASE_ITEM_QUANTITY: (state, action) => {
      const productId = action.payload;
      const exitingProduct = state.items.find((item) => item.id === productId);

      exitingProduct.quantity = exitingProduct.quantity - 1;

      const { totalItems, totalAmount } = getCartValues(state.items);

      state.totalCartItems = parseInt(totalItems);
      state.totalCartAmount = parseFloat(totalAmount).toFixed(2);

      saveData("cart", state.items);
    },

    UPDATE_CART: (state, action) => {
      state.items = action.payload;

      const { totalItems, totalAmount } = getCartValues(state.items);

      state.totalCartItems = parseInt(totalItems).toString();
      state.totalCartAmount = parseFloat(totalAmount).toFixed(2);
    },
  },
});

export default cartSlice.reducer;

export const cartActions = cartSlice.actions;
export const selectCartState = (state) => state.cart;
