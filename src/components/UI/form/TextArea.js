import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const TextArea = React.forwardRef((props, ref) => {
  const { textArea, hasError, errorMsg } = props;

  return (
    <Box
      sx={{
        "& textarea": {
          width: "100%",
          height: "100px",
          p: "12px",
          outline: "none",
          border: `1px solid  ${hasError ? "#e50000" : "#cecece "}`,
          borderRadius: 1,
          resize: "none",
          caretColor: "primary.main",
          "&:focus": {
            borderColor: hasError ? "#e50000" : "primary.main",
          },
        },
      }}
    >
      <textarea {...textArea} ref={ref} />
      {hasError && <Typography color="#e50000">{errorMsg}</Typography>}
    </Box>
  );
});

export default React.memo(TextArea);
