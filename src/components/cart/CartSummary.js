import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { selectAuthState } from "@/store/slices/auth-slice";
import { userNotification } from "@/utils/notifications";

const CartSummary = ({ totalAmount }) => {
  const { session } = useSelector(selectAuthState);
  const { push } = useRouter();

  const navigateToCheckoutPage = () => {
    if (!session) {
      push("/account/login");
      userNotification("info", "please log in to complete the payment process");
      return;
    }

    push("/checkout");
  };

  return (
    <Box bgcolor="#fff" p={2} mt={2}>
      <Typography
        variant="h5"
        textTransform="uppercase"
        pb="4px"
        mb={2}
        borderBottom="1px solid #ccc"
      >
        cart summary
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap={2}
        flexWrap="wrap"
      >
        <Box>
          <Typography variant="h5" color="primary.main">
            Subtotal
          </Typography>
          <Typography variant="body1" fontSize="1.5rem !important">
            ${totalAmount}
          </Typography>
        </Box>
        <Button
          type="button"
          variant="contained"
          size="large"
          onClick={navigateToCheckoutPage}
        >
          checkout (${totalAmount})
        </Button>
      </Stack>
    </Box>
  );
};

export default CartSummary;
