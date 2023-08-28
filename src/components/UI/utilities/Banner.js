import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import bannerBg from "../../../assets/images/banners/banner-bg.jpg";

const Banner = () => {
  return (
    <section
      style={{
        backgroundImage: `url(${bannerBg.src})`,
        padding: "calc(12% + 74px) 0 12%",
      }}
    >
      <Container>
        <Box>
          <Box textAlign="center">
            <Typography variant="h3" pb={2}>
              Summer payweek
            </Typography>
            <Typography
              variant="h2"
              sx={{
                whiteSpace: "break-spaces",
                "& .MuiTypography-body1": {
                  fontSize: "inherit",
                  lineHeight: 1.2,
                },
              }}
            >
              <Typography component="span">
                Buy 4 get 15% off <br /> Buy 6 get 20% off
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Container>
    </section>
  );
};

export default Banner;
