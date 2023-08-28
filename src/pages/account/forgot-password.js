import { Centring } from "@/components/UI";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Button from "@mui/material/Button";

const ForgotPasswordPage = () => {
  return (
    <Centring>
      <Box textAlign="center">
        <Typography variant="h4">
          Sorry, this page is currently being worked on!
        </Typography>
        <Typography variant="h5" py={2} color="primary.main">
          come back soon
        </Typography>
        <Link href="/">
          <Button variant="contained" size="large">
            back to home
          </Button>
        </Link>
      </Box>
    </Centring>
  );
};

export default ForgotPasswordPage;
