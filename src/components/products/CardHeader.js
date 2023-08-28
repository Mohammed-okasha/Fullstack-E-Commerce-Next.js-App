import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/legacy/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import WishlistButton from "../UI/utilities/WishlistButton";
import { selectWishlistState } from "@/store/slices/wishlist-slice";

const CardHeader = ({ product }) => {
  const { items } = useSelector(selectWishlistState);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavoriteHandler = useCallback(
    () => setIsFavorite((prevState) => !prevState),
    []
  );

  useEffect(() => {
    const wishlistItem = items.find((item) => item.id === product.id);

    if (wishlistItem) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [items, product.id]);

  return (
    <Box position="relative">
      <Link href={`/shop/${product.id}`}>
        <Box
          sx={{
            position: "relative",
            bgcolor: "#f6f6f6",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            overflow: "hidden",
          }}
        >
          <Image
            width={500}
            height={400}
            src={product.thumbnail}
            alt={product.thumbnail}
            priority={true}
            className="rounded"
          />
        </Box>
        <Typography variant="h6" px={2} pt={2} pb={1}>
          {product.title}
        </Typography>
      </Link>
      <WishlistButton
        product={product}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavoriteHandler}
      />
    </Box>
  );
};

export default CardHeader;
