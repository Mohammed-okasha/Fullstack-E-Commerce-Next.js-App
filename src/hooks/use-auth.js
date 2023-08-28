import { useEffect } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { useDispatch } from "react-redux";
import { authActions } from "@/store/slices/auth-slice";
import { cartActions } from "@/store/slices/cart-slice";
import { wishlistActions } from "@/store/slices/wishlist-slice";
import { getData } from "@/utils/helpers";

const fetcher = (url) => fetch(url).then((res) => res.json());
//============================================================
export const useAuth = () => {
  const { data: session, status } = useSession();

  const {
    data: userCart,
    cartError,
    isLoading: cartLoading,
  } = useSWR("/api/cart", fetcher);

  const {
    data: userWishlist,
    wishlistError,
    isLoading: wishlistLoading,
  } = useSWR("/api/wishlist/user", fetcher);

  const dispatch = useDispatch();

  const sessionLoading = status === "loading";

  useEffect(() => {
    if (session) {
      dispatch(authActions.ACTIVATE_SESSION({ session, status: status }));
    }

    if (session && userCart) {
      if (userCart.cart) {
        dispatch(cartActions.UPDATE_CART(userCart.cart));
      }
    }

    if (session && userWishlist) {
      if (userWishlist.wishlist) {
        dispatch(wishlistActions.UPDATE_WISHLIST(userWishlist.wishlist));
      }
    }

    if (!session && !sessionLoading) {
      const cart = getData("cart") ? getData("cart") : [];
      const wishlist = getData("wishlist") ? getData("wishlist") : [];

      dispatch(cartActions.UPDATE_CART(cart));
      dispatch(wishlistActions.UPDATE_WISHLIST(wishlist));
    }
  }, [session, status, userCart, userWishlist, sessionLoading, dispatch]);

  return {
    sessionLoading,
    cartLoading,
    wishlistLoading,
    cartError,
    wishlistError,
  };
};
