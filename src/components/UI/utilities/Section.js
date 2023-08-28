import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const Section = (props) => {
  const { children, title, variant } = props;
  return (
    <section style={{ padding: "3rem 0" }}>
      <Container>
        <Typography variant={variant} mb={2}>
          {title}
        </Typography>
        {children}
      </Container>
    </section>
  );
};

export default Section;
