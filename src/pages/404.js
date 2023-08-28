import Head from "next/head";
import { Centring } from "@/components/UI";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Button from "@mui/material/Button";

const NotFoundPage = () => {
  return (
    <>
      <Head>
        <title>404</title>
        <meta
          name="description"
          content="the 404 page appears when a search result is not found on our website"
        />
      </Head>
      <Centring>
        <Box textAlign="center">
          <Typography variant="h1" color="red">
            404
          </Typography>
          <Typography variant="h3">Not Found Page</Typography>
          <Link href="/">
            <Button variant="contained" size="large" sx={{ mt: 3 }}>
              back to home
            </Button>
          </Link>
        </Box>
      </Centring>
    </>
  );
};

export default NotFoundPage;
