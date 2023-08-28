import React from "react";
import Grid from "@mui/material/Grid";
import Image from "next/legacy/image";

const ImageList = ({ images, onToggleMainImage }) => {
  if (images.length === 0) {
    return null;
  }

  return (
    <Grid container spacing={1} mt={1}>
      {images.map((img, index) => (
        <Grid
          key={index}
          item
          xs={4}
          sm={3}
          sx={{ cursor: "pointer", "& img": { userSelect: "none" } }}
          onClick={onToggleMainImage.bind(null, img)}
        >
          <Image
            src={img}
            alt="mini-product-image"
            width={200}
            height={150}
            priority={true}
            className="radius"
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default React.memo(ImageList);
