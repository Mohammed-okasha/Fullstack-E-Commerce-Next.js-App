import { useContext, useState, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import ProductContext from "@/context/product-details";
import Image from "next/legacy/image";
import Box from "@mui/material/Box";
import ImageList from "./ImageList";
import WishlistButton from "@/components/UI/utilities/WishlistButton";
import { selectWishlistState } from "@/store/slices/wishlist-slice";
//===============================================================
const ImageBlock = () => {
  const product = useContext(ProductContext);
  const [mainImage, setMainImage] = useState(product.thumbnail);
  const { items } = useSelector(selectWishlistState);
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavoriteHandler = useCallback(
    () => setIsFavorite((prvState) => !prvState),
    []
  );
  const toggleMainImage = useCallback((img) => setMainImage(img), []);

  useEffect(() => {
    const wishlistItem = items.find((item) => item.id === product.id);

    if (wishlistItem) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [items, product.id]);

  return (
    <Box>
      <Box position="relative">
        <Image
          src={mainImage}
          alt={product.title}
          width={800}
          height={450}
          priority={true}
          className="radius"
        />
        <WishlistButton
          product={product}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavoriteHandler}
        />
      </Box>
      <ImageList images={product.images} onToggleMainImage={toggleMainImage} />
    </Box>
  );
};

export default ImageBlock;
