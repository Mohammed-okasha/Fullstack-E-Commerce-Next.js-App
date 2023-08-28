import { Centring } from "..";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Button from "@mui/material/Button";

const EmptyCart = ({ title, icon }) => {
  return (
    <Centring>
      <Box textAlign="center">
        <Box mb={2}>{icon}</Box>
        <Box mb={2}>
          <Typography variant="h4" pb={1}>
            Your {title} is empty!
          </Typography>
          <Typography variant="body1">
            Browse our categories and discover our best deals!
          </Typography>
        </Box>
        <Link href="/shop">
          <Button variant="contained" size="large">
            continue shopping
          </Button>
        </Link>
      </Box>
    </Centring>
  );
};

export default EmptyCart;
