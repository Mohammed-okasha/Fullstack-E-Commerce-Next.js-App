import { useSelector } from "react-redux";
import WishlistList from "./WishlistList";
import { EmptyBox } from "../UI";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import { selectWishlistState } from "@/store/slices/wishlist-slice";

const WishlistContent = () => {
  const { items } = useSelector(selectWishlistState);

  if (items.length === 0) {
    return (
      <EmptyBox
        title="wishlist"
        icon={
          <HeartBrokenIcon
            sx={{ width: "8rem", height: "8rem", color: "primary.main" }}
          />
        }
      />
    );
  }

  return <WishlistList items={items} />;
};

export default WishlistContent;
