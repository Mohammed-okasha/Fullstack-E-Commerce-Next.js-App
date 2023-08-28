import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectCartState } from "@/store/slices/cart-slice";
import { selectWishlistState } from "@/store/slices/wishlist-slice";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import { navButtons } from "@/assets/data/paths";

const HeaderButtons = ({ session }) => {
  const router = useRouter();
  const { totalCartItems } = useSelector(selectCartState);
  const { totalWishlistItems } = useSelector(selectWishlistState);

  const navigateHandler = (path) => {
    router.push("/" + path);
  };

  return (
    <Stack direction="row">
      {navButtons.map((navBtn) => {
        const accountLink = navBtn.path.includes("account");

        if (navBtn.path === "wishlist" || navBtn.path === "cart") {
          return (
            <IconButton
              key={navBtn.path}
              sx={{ color: "#202020" }}
              onClick={navigateHandler.bind(null, navBtn.path)}
            >
              <Badge
                badgeContent={
                  navBtn.path === "cart"
                    ? totalCartItems
                    : navBtn.path === "wishlist"
                    ? totalWishlistItems
                    : undefined
                }
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                color="primary"
              >
                <navBtn.icon fontSize="large" color="#202020" />
              </Badge>
            </IconButton>
          );
        }

        if (accountLink && session) {
          const username = session.user.name.slice(0, 1);
          return (
            <Link
              key={navBtn.path}
              href="/profile"
              style={{ padding: "8px 8px 0 " }}
            >
              <Avatar
                sx={{
                  bgcolor: "primary.main",
                  display: "inline-flex",
                  width: "30px",
                  height: "30px",
                  fontSize: "13px",
                }}
              >
                {username}
              </Avatar>
            </Link>
          );
        }

        return (
          <IconButton
            key={navBtn.path}
            sx={{ color: "#202020" }}
            onClick={navigateHandler.bind(null, navBtn.path)}
          >
            <navBtn.icon fontSize="large" color="#202020" />
          </IconButton>
        );
      })}
    </Stack>
  );
};

export default HeaderButtons;
