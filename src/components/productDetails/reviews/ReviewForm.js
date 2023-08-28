import { useState, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { Spinner, FormText, TextArea } from "@/components/UI";
import { selectAuthState } from "@/store/slices/auth-slice";

const ReviewForm = ({ onAddReview, loading }) => {
  const { session } = useSelector(selectAuthState);
  const [reviewIsNotValid, setReviewIsNotValid] = useState(false);
  const textAreaRef = useRef(null);
  const [rating, setRating] = useState("0");
  const hasSession = Boolean(session);

  const addRatingHandler = (e) => setRating(e.target.value);

  const textAreaConfig = useMemo(
    () => ({ name: "client-review", placeholder: "Write Your Review .." }),
    []
  );

  const submitReviewHandler = async (e) => {
    e.preventDefault();

    const enteredValue = textAreaRef.current.value;
    const valueIsNotValid = enteredValue.trim().length === 0;

    setReviewIsNotValid(valueIsNotValid);

    if (valueIsNotValid) {
      return;
    }

    const formValues = {
      text: enteredValue,
      rating: rating,
    };

    await onAddReview(formValues);

    textAreaRef.current.value = "";
    setRating("0");
  };

  return (
    <form onSubmit={submitReviewHandler}>
      <TextArea
        textArea={textAreaConfig}
        ref={textAreaRef}
        hasError={reviewIsNotValid}
        errorMsg={reviewIsNotValid ? "this field required!" : null}
      />

      <Stack direction="row" spacing={1} mb={2} mt={1}>
        <Typography>rate this product:</Typography>
        <Rating
          name="review-rate"
          value={rating}
          precision={0.5}
          onChange={addRatingHandler}
        />
      </Stack>

      <Box>
        {!session && (
          <FormText
            text="you should log in to add a review!"
            path="/account/login"
            pathName="log in"
            justifyContent="initial"
          />
        )}
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={!hasSession}
        >
          {!loading ? "add review" : <Spinner />}
        </Button>
      </Box>
    </form>
  );
};

export default ReviewForm;
