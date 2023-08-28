import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const Logo = ({ isFooter }) => {
  const { palette: colors } = useTheme();

  return (
    <Link href="/" style={{ color: !isFooter ? colors.primary.main : "#fff" }}>
      <Typography variant="h3" textAlign="center" py={1}>
        D&E
      </Typography>
    </Link>
  );
};

export default Logo;
