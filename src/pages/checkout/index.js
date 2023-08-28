import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import { Centring } from "@/components/UI";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Button from "@mui/material/Button";

const CheckoutPage = ({ session }) => {
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

export const getServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/account/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default CheckoutPage;
