import React, { useState, useContext } from "react";

import { Snackbar } from "@mui/material";

import { HomeContext } from "./context/home/HomeContext";
import Routes from "./routes";
import Alert from "./components/Alert";
function Main() {
  const {
    state: { snackbar },
    actions,
  } = useContext(HomeContext);

  return (
    <>
      <Routes />
      {snackbar && (
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          open={snackbar}
          onClose={actions.closeSnackbar}
          autoHideDuration={6000}
          sx={{ width: "100%" }}
        >
          <Alert onClose={actions.closeSnackbar} severity={snackbar.severity}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

export default Main;
