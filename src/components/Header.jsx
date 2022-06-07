import React from "react";

import AddIcon from "@mui/icons-material/Add";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Button, IconButton } from "@mui/material";

import { MONTHS } from "../utils/constants";
export default function Header({
  handleLeftClick,
  handleRightClick,
  handleNewReminderClick,
  currentDate,
}) {
  return (
    <header>
      <nav>
        <IconButton size="small" onClick={(e) => handleLeftClick()}>
          <ChevronLeftIcon />
        </IconButton>
        <h2>
          <span>{MONTHS[currentDate.getMonth()]}</span>
          {"  "}
          <span style={{ fontWeight: "normal" }}>
            {currentDate.getFullYear()}
          </span>
        </h2>
        <IconButton size="small" onClick={(e) => handleRightClick()}>
          <ChevronRightIcon />
        </IconButton>
      </nav>
      <Button onClick={() => handleNewReminderClick()}>
        <AddIcon fontSize="small" />
        <span>New Reminder</span>
      </Button>
    </header>
  );
}
