import React, { useState, createContext } from "react";

import { getForecastForDate } from "../../utils/visualCrossing";

export const HomeContext = createContext({});

export const HomeProvider = ({ children }) => {
  const [reminders, setReminders] = useState({});
  const [snackbar, setSnackbar] = useState();

  const addReminder = async (dateId, reminderData, editing = false) => {
    const forecast = await getForecastForDate(
      reminderData.city,
      reminderData.date
    );
    if (!forecast) {
      setSnackbar({
        severity: "warning",
        message: "No weather data available",
      });
    } else {
      setSnackbar({
        severity: "success",
        message: !editing ? "Reminder created" : "Reminder updated",
      });
    }
    setReminders((oldSt) => {
      reminderData.forecast = forecast;
      if (!oldSt[dateId]) {
        oldSt[dateId] = [reminderData];
      } else {
        oldSt[dateId].push(reminderData);
      }
      return oldSt;
    });
  };

  const deleteReminder = (dateId, reminderId) => {
    setReminders((oldSt) => {
      oldSt[dateId] = oldSt[dateId].filter(
        (reminder) => reminder.id !== reminderId
      );
      return oldSt;
    });
  };

  const editReminder = async (dateId, reminderId, reminderData) => {
    const newDateId = new Date(reminderData.date).toDateString();
    let remindersCp = { ...reminders };
    let targetReminder = remindersCp[dateId].find(
      (reminder) => reminder.id === reminderId
    );
    if (!targetReminder) {
      return;
    }
    deleteReminder(dateId, reminderId);
    reminderData.initialReminderDate = reminderData.date;
    await addReminder(newDateId, reminderData);
  };
  const openSnackbar = (data) => {
    setSnackbar(data);
  };
  const closeSnackbar = () => {
    setSnackbar();
  };
  return (
    <HomeContext.Provider
      value={{
        state: { reminders, snackbar },
        actions: {
          addReminder,
          deleteReminder,
          editReminder,
          openSnackbar,
          closeSnackbar,
        },
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
