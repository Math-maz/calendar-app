import React from "react";
import Autocomplete from "react-google-autocomplete";

import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
export default function EditReminderModal({
  handleEditReminder,
  editReminder,
  setEditReminder,
  handleCloseEditModal,
}) {
  return (
    <div className="modal">
      <Box
        component="form"
        onSubmit={handleEditReminder}
        sx={{
          "& > :not(style)": { m: 1, width: "100%" },
          display: "flex",
          width: 400,
          flexDirection: "column",
          backgroundColor: "white",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          alignItems: "center",
          padding: "24px",
          borderRadius: 2,
          "& div": {
            marginTop: 0,
          },
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h4">Edit Reminder</Typography>
        <Autocomplete
          label="City"
          apiKey="AIzaSyDzehZryzqHYGsAnvRq3sVB7MCxNsoig5g"
          disablePortal
          placeholder="City"
          fullWidth
          defaultValue={editReminder.city}
          // options={[{ label: "Teste" }]}
          onPlaceSelected={async (place) => {
            const cityName = place.address_components[0].long_name;
            setEditReminder((oldState) => ({
              ...oldState,
              city: cityName,
            }));
          }}
          // renderInput={(params) => <TextField {...params} label="City" />}
          style={{
            padding: "16.5px 14px",
          }}
        />
        <TextField
          fullWidth
          label="Reminder"
          id="title"
          variant="outlined"
          name="title"
          type="text"
          value={editReminder.text}
          onChange={(e) => {
            if (
              editReminder.text &&
              editReminder.text.length === 30 &&
              e.target.value.length > 30
            ) {
              return;
            }
            setEditReminder((oldState) => ({
              ...oldState,
              text: e.target.value,
            }));
          }}
          placeholder="Title of reminder"
          sx={{
            marginTop: "12px !important",
          }}
        />
        <TextField
          fullWidth
          label="Date"
          variant="outlined"
          value={editReminder.date}
          onChange={(e) => {
            setEditReminder((oldState) => ({
              ...oldState,
              date: e.target.value,
            }));
          }}
          name="date"
          type="datetime-local"
          sx={{
            marginTop: "12px !important",
          }}
        />
        <Button
          onClick={handleEditReminder}
          variant="contained"
          sx={{
            backgroundColor: "#4D4C7D",
            "&:hover": {
              backgroundColor: "#A5BECC",
            },
          }}
        >
          Edit
        </Button>
        <IconButton
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            width: "32px !important",
            height: 32,
          }}
          onClick={handleCloseEditModal}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </div>
  );
}
