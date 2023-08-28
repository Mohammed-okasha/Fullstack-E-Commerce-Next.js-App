import Link from "next/link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const FormText = (props) => {
  const { text, path, pathName, justifyContent } = props;

  return (
    <Stack direction="row" justifyContent={justifyContent} mb={2}>
      {text && <Typography pr={1}>{text}</Typography>}
      <Link href={path} style={{ color: "#0063d1" }}>
        {pathName}
      </Link>
    </Stack>
  );
};

export default FormText;
