import { useState, useEffect, useContext } from "react";
import useSwr from "swr";
import Box from "@mui/material/Box";
import NewReview from "./NewReview";
import Reviews from "./Reviews";
import { Spinner } from "@/components/UI";
import ProductContext from "@/context/product-details";

const fetcher = (url) => fetch(url).then((res) => res.json());

const ReviewsWrapper = () => {
  const [reviews, setReviews] = useState([]);
  const { id } = useContext(ProductContext);
  const { data, isLoading } = useSwr(`/api/reviews/${id}`, fetcher);

  const addReviewHandler = (newReview) => {
    setReviews((prevReviews) => [newReview, ...prevReviews]);
  };

  useEffect(() => {
    if (data) {
      if (data.reviews.length > 0) {
        setReviews(data.reviews);
      }
    }
  }, [data]);

  const loadingElement = (
    <Box textAlign="center" sx={{ "& div": { width: "40px", height: "40px" } }}>
      <Spinner colored={true} />
    </Box>
  );

  return (
    <Box>
      <NewReview onAddReview={addReviewHandler} productId={id} />
      {isLoading && loadingElement}
      {!isLoading && <Reviews items={reviews} />}
    </Box>
  );
};

export default ReviewsWrapper;
