import React, { useState, useContext } from "react";

import GlobalSnackbar from "./components/GlobalSnackbar/GlobalSnackbar";
import { HomeContext } from "./context/home/HomeContext";
import Routes from "./routes";
function Main() {
  const {
    state: { snackbar },
  } = useContext(HomeContext);

  return (
    <>
      <Routes />
      {snackbar && <GlobalSnackbar />}
    </>
  );
}

export default Main;
