import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAlertStore } from "../../store/useAlertStore";

export default function CopyAlertProvider() {
  const { message, severity, show, hideAlert } = useAlertStore();

  return (
    <Snackbar
      open={show}
      autoHideDuration={2000}
      onClose={hideAlert}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      sx={{ marginBottom: 2, marginLeft: 2 }}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
}
