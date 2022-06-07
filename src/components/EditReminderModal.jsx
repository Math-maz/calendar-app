import React, { useState } from "react";
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";

import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
export default function EditReminderModal({
  handleEditReminder,
  editReminder,
  setEditReminder,
  handleCloseEditModal,
}) {
  const { ref } = usePlacesWidget({
    apiKey: "AIzaSyDzehZryzqHYGsAnvRq3sVB7MCxNsoig5g",
    onPlaceSelected: async (place) => {
      const cityName = place.address_components[0].long_name;
      setEditReminder((oldState) => ({
        ...oldState,
        city: cityName,
      }));
    },
  });
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const errors = {};
    let hasError = false;
    if (!editReminder.city) {
      errors.city = "Field cannot be empty";
      hasError = true;
    }
    if (!editReminder.text) {
      errors.text = "Field cannot be empty";
      hasError = true;
    }
    if (!editReminder.date) {
      errors.date = "Field cannot be empty";
      hasError = true;
    }
    setErrors(errors);
    return hasError;
  };
  return (
    <div className="modal">
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          const hasError = validateFields();
          if (hasError) {
            return;
          }
          handleEditReminder();
        }}
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
        <TextField
          inputRef={ref}
          error={errors.city && errors.city.length > 0}
          helperText={errors.city && errors.city.length > 0 ? errors.city : ""}
          fullWidth
          label="City"
          id="title"
          variant="outlined"
          name="title"
          type="text"
          value={editReminder.city}
          onFocus={(e) => {
            setErrors({
              ...errors,
              city: null,
            });
          }}
          onChange={(e) => {
            setEditReminder((oldSt) => ({
              ...oldSt,
              city: e.target.value,
            }));
          }}
          sx={{
            marginTop: "12px !important",
          }}
        />
        <TextField
          error={errors.text && errors.text.length > 0}
          helperText={errors.text && errors.text.length > 0 ? errors.text : ""}
          fullWidth
          label="Reminder"
          id="text"
          variant="outlined"
          name="text"
          type="text"
          value={editReminder.text}
          onFocus={(e) => {
            setErrors({
              ...errors,
              text: null,
            });
          }}
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
          error={errors.date && errors.date.length > 0}
          helperText={errors.date && errors.date.length > 0 ? errors.date : ""}
          fullWidth
          label="Date"
          variant="outlined"
          value={editReminder.date}
          onFocus={(e) => {
            setErrors({
              ...errors,
              date: null,
            });
          }}
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
          type="submit"
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
