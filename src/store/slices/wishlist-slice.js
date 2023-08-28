import { createSlice } from "@reduxjs/toolkit";
import { saveData, removeData } from "@/utils/helpers";

const defaultWishlistState = {
  items: [],
  totalWishlistItems: "0",
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: defaultWishlistState,

  reducers: {
    TOGGLE_FAVORITE: (state, action) => {
      const isFavorite = action.payload.isFavorite;

      if (isFavorite) {
        state.items.unshift(action.payload);
      } else {
        const updatedWishlist = state.items.filter(
          (item) => item.id !== action.payload.id
        );

        state.items = updatedWishlist;
      }

      const wishlistItemsCount = state.items.length;
      state.totalWishlistItems = wishlistItemsCount.toString();

      saveData("wishlist", state.items);
    },

    UPDATE_WISHLIST: (state, action) => {
      const wishlist = action.payload;

      state.items = wishlist;
      state.totalWishlistItems = wishlist.length.toString();
    },
  },
});

export default wishlistSlice.reducer;

export const wishlistActions = wishlistSlice.actions;
export const selectWishlistState = (state) => state.wishlist;
