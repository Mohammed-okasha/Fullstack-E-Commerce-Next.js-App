import { useHttp } from "@/hooks/use-http";
import Box from "@mui/material/Box";
import ReviewForm from "./ReviewForm";

import { userNotification } from "@/utils/notifications";

const NewReview = ({ onAddReview, productId }) => {
  const { loading, sendRequest } = useHttp();

  const addNewReviewHandler = async (reviewData) => {
    const createdReview = { ...reviewData, date: new Date() };

    try {
      const result = await sendRequest({
        url: `/api/reviews/${productId}`,
        method: "POST",
        body: createdReview,
        headers: { "Content-Type": "application/json" },
      });

      onAddReview(result.review);
      userNotification("success", result.message);
    } catch (error) {
      userNotification("error", error.message);
    }
  };

  return (
    <Box mb={3}>
      <ReviewForm onAddReview={addNewReviewHandler} loading={loading} />
    </Box>
  );
};

export default NewReview;
