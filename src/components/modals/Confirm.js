import { Modal, Card, Spinner } from "../UI";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ReportIcon from "@mui/icons-material/ReportGmailerrorredOutlined";

const ConfirmModal = (props) => {
  const { onDelete, onCloseConfirm, loading } = props;

  return (
    <Modal onCloseModal={onCloseConfirm}>
      <Card>
        <Box textAlign="center">
          <ReportIcon sx={{ width: "6rem", height: "6rem", fill: "red" }} />
          <Typography pt={1} mb={2}>
            are you sure you want delete this item!
          </Typography>
          <Button variant="contained" size="large" onClick={onDelete}>
            {!loading ? "delete" : <Spinner />}
          </Button>
        </Box>
      </Card>
    </Modal>
  );
};

export default ConfirmModal;
