import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Logo from "../Header/Logo";

const Footer = () => {
  const { palette: colors } = useTheme();
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: colors.primary.main, padding: "1rem 0" }}>
      <Container maxWidth="md">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={1}
        >
          <Typography variant="body1" color="#fff">
            created by mohammed sherif &copy; {year}
          </Typography>
          <Logo isFooter={true} />
        </Stack>
      </Container>
    </footer>
  );
};

export default Footer;
