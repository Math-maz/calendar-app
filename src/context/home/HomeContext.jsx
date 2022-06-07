import React, { useState, createContext } from "react";

import { getForecastForDate } from "../../utils/visualCrossing";

export const HomeContext = createContext({});

export const HomeProvider = ({ children }) => {
  const [reminders, setReminders] = useState({});

  const addReminder = async (dateId, reminderData) => {
    const forecast = await getForecastForDate(
      reminderData.city,
      reminderData.date
    );
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

  return (
    <HomeContext.Provider
      value={{
        state: { reminders },
        actions: {
          addReminder,
          deleteReminder,
          editReminder,
        },
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
