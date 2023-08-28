import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "@/hooks/use-http";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Spinner } from "@/components/UI";
import { userNotification } from "@/utils/notifications";
import { wishlistActions } from "@/store/slices/wishlist-slice";
import { selectAuthState } from "@/store/slices/auth-slice";

const WishlistButton = ({ product, isFavorite, onToggleFavorite }) => {
  const { session } = useSelector(selectAuthState);
  const { loading, sendRequest } = useHttp();
  const dispatch = useDispatch();

  const btnStyle = {
    position: "absolute",
    right: 10,
    top: 10,
    bgcolor: "#fff",
    "&:hover": { bgcolor: "#fff" },
  };
  const iconStyle = { fill: "#0063d1", width: "2rem", height: "2rem" };

  const toggleFavoriteHandler = async () => {
    if (session) {
      try {
        const result = await sendRequest({
          url: "/api/wishlist",
          method: "POST",
          body: { ...product, isFavorite: !isFavorite },
          headers: { "Content-Type": "application/json" },
        });

        onToggleFavorite();
        dispatch(wishlistActions.TOGGLE_FAVORITE(result.item));
        userNotification("success", result.message);
      } catch (error) {
        userNotification("error", error.message);
      }

      return;
    }

    onToggleFavorite();
    dispatch(
      wishlistActions.TOGGLE_FAVORITE({ ...product, isFavorite: !isFavorite })
    );
    userNotification("success", `wishlist updated `);
  };

  return (
    <IconButton sx={btnStyle} onClick={toggleFavoriteHandler}>
      {!isFavorite && !loading && <FavoriteBorderIcon sx={iconStyle} />}
      {isFavorite && !loading && <FavoriteIcon sx={iconStyle} />}
      {loading && <Spinner colored={true} />}
    </IconButton>
  );
};

export default React.memo(WishlistButton);
