import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/PersonOutline";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { FormattedDate } from "@/components/UI";

const ReviewItem = ({ item }) => {
  return (
    <Box
      sx={{
        "&:not(:last-of-type)": {
          borderBottom: "1px solid #ccc",
          pb: 2,
          mb: 2,
        },
      }}
    >
      <Stack direction="row" gap={2}>
        <Avatar>
          <PersonIcon sx={{ width: "2rem", height: "2rem" }} />
        </Avatar>
        <Box>
          <Typography>{item.userName}</Typography>
          <FormattedDate date={item.date} />
        </Box>
      </Stack>
      <Box mt={1} mb={2}>
        <Rating
          name="review-rate"
          value={item.rating}
          precision={0.5}
          readOnly
        />
      </Box>
      <Typography>{item.text}</Typography>
    </Box>
  );
};

export default ReviewItem;
