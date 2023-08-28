import Head from "next/head";
import { Centring } from "@/components/UI";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Button from "@mui/material/Button";

const error = () => {
  return (
    <>
      <Head>
        <title>Error</title>
        <meta
          name="description"
          content="the Error when something went wrong on our website!"
        />
      </Head>
      <Centring>
        <Box textAlign="center">
          <Typography variant="h1">Oops!</Typography>
          <Typography variant="h3" pt={1} mb={3}>
            something went wrong!
          </Typography>
          <Link href="/">
            <Button variant="contained" size="large">
              back to home
            </Button>
          </Link>
        </Box>
      </Centring>
    </>
  );
};

export default error;
