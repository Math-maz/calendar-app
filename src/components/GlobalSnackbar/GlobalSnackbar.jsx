import React, { useContext } from "react";

import { Snackbar } from "@mui/material";

import { HomeContext } from "../../context/home/HomeContext";
import Alert from "./Alert";

export default function GlobalSnackbar() {
  const {
    state: { snackbar },
    actions,
  } = useContext(HomeContext);
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={!!snackbar}
      onClose={actions.closeSnackbar}
      autoHideDuration={6000}
      sx={{ width: "100%" }}
    >
      <Alert onClose={actions.closeSnackbar} severity={snackbar.severity}>
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
}
