import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ReviewItem from "./ReviewItem";
import CommentIcon from "@mui/icons-material/Comment";

const Reviews = ({ items }) => {
  const reviewsCount = items.length;

  let reviewsContent = (
    <Box textAlign="center">
      <Typography variant="h6" pb={1}>
        no reviews yet, start to add your review
      </Typography>
      <CommentIcon sx={{ width: "5rem", height: "5rem", fill: "#0063d1" }} />
    </Box>
  );

  if (reviewsCount > 0) {
    reviewsContent = items.map((review) => (
      <ReviewItem key={review.id} item={review} />
    ));
  }

  return (
    <Box sx={{ bgcolor: "#fff", p: "20px 16px", borderRadius: 1 }}>
      <Typography variant="h5" mb={3}>
        product reviews ({reviewsCount})
      </Typography>
      {reviewsContent}
    </Box>
  );
};

export default Reviews;
