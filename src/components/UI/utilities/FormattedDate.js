import Typography from "@mui/material/Typography";

const FormattedDate = ({ date }) => {
  const newDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return <Typography>{newDate}</Typography>;
};

export default FormattedDate;
