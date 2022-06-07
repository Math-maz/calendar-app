import React, { useState } from "react";
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";

import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
export default function AddReminderModal({
  handleAddReminder,
  reminder,
  setReminder,
  handleCloseModal,
}) {
  const { ref } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE_APIKEY,
    onPlaceSelected: async (place) => {
      const cityName = place.address_components[0].long_name;
      setReminder((oldSt) => ({
        ...oldSt,
        city: cityName,
      }));
    },
  });

  const [errors, setErrors] = useState({});

  const validateFields = () => {
    const errors = {};
    let hasError = false;
    if (!reminder.city) {
      errors.city = "Field cannot be empty";
      hasError = true;
    }
    if (!reminder.text) {
      errors.text = "Field cannot be empty";
      hasError = true;
    }
    if (!reminder.date) {
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
          handleAddReminder();
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
        <Typography variant="h4">Add Reminder</Typography>
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
          value={reminder.city}
          onFocus={(e) => {
            setErrors({
              ...errors,
              city: null,
            });
          }}
          onChange={(e) => {
            setReminder((oldSt) => ({
              ...oldSt,
              city: e.target.value,
            }));
          }}
          sx={{
            marginTop: "12px !important",
          }}
        />
        <TextField
          fullWidth
          error={errors.text && errors.text.length > 0}
          helperText={errors.text && errors.text.length > 0 ? errors.text : ""}
          label="Reminder"
          id="title"
          variant="outlined"
          name="title"
          type="text"
          value={reminder.text}
          onFocus={(e) => {
            setErrors({
              ...errors,
              text: null,
            });
          }}
          onChange={(e) => {
            if (
              reminder.text &&
              reminder.text.length === 30 &&
              e.target.value.length > 30
            ) {
              return;
            }
            setReminder((oldSt) => ({
              ...oldSt,
              text: e.target.value,
            }));
          }}
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
          value={reminder.date}
          onFocus={(e) => {
            setErrors({
              ...errors,
              date: null,
            });
          }}
          onChange={(e) => {
            setReminder((oldSt) => ({
              ...oldSt,
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
          Create
        </Button>
        <IconButton
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            width: "32px !important",
            height: 32,
          }}
          onClick={handleCloseModal}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </div>
  );
}
