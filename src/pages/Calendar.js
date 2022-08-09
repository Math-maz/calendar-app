import React, { useState, useEffect, useContext } from "react";

import { Snackbar } from "@mui/material";

import moment from "moment";
import { nanoid } from "nanoid";

import "../sass/calendar.scss";

import AddReminderModal from "../components/AddReminderModal";
import DateCard from "../components/DateCard";
import EditReminderModal from "../components/EditReminderModal";
import Header from "../components/Header";
import ReminderCard from "../components/ReminderCard";
import { HomeContext } from "../context/home/HomeContext";
import { DAYS_OF_THE_WEEK } from "../utils/constants";
import getMonthDays from "../utils/loadMonth";

function Calendar(props) {
  // your calendar implementation Goes here!
  // Be creative
  const {
    state: { reminders },
    actions,
  } = useContext(HomeContext);
  const [days, setDays] = useState([]);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentDateId, setCurrentDateId] = useState();

  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [newReminder, setNewReminder] = useState({
    date: moment(new Date()).format("YYYY-MM-DD[T]HH:mm"),
  });
  const [editReminder, setEditReminder] = useState({});

  const loadMonth = (date) => {
    const days = getMonthDays(date);
    setDays(days);
  };
  useEffect(() => {
    loadMonth(currentDate);
  }, [currentDate]);
  const formatRemindersHeader = (date) => {
    return moment(new Date(date)).format("MMMM Do");
  };

  const handleEditReminder = async () => {
    const dateId = new Date(editReminder.initialReminderDate).toDateString();
    await actions.editReminder(dateId, editReminder.id, editReminder);
    setOpenEditModal(false);
    setEditReminder({});
  };

  const handleAddReminder = async () => {
    try {
      const dateId = new Date(newReminder.date).toDateString();
      const reminder = {
        id: nanoid(),
        text: newReminder.text,
        city: newReminder.city,
        initialReminderDate: newReminder.date,
        date: newReminder.date,
      };
      await actions.addReminder(dateId, reminder);
      setOpenModal(false);
      setNewReminder({
        date: moment(new Date()).format("YYYY-MM-DD[T]HH:mm"),
      });
    } catch (error) {
      actions.openSnackbar({
        severity: "error",
        message: error.message,
      });
      setOpenModal(false);
      setNewReminder({
        date: moment(new Date()).format("YYYY-MM-DD[T]HH:mm"),
      });
    }
  };
  const handleCardClick = (day) => {
    if (!day.active) {
      return;
    }
    setCurrentDateId(
      `${new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day.day
      ).toDateString()}`
    );
    setNewReminder((oldSt) => ({
      ...oldSt,
      date: moment(
        new Date(currentDate.getFullYear(), currentDate.getMonth(), day.day)
      ).format("YYYY-MM-DD[T]HH:mm"),
    }));
  };
  const handleReminderCardClick = (reminder) => {
    setEditReminder(reminder);
    setOpenEditModal(true);
  };

  const handleLeftClick = () => {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() - 1);
    setCurrentDate(date);
    loadMonth(date);
  };
  const handleRightClick = () => {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() + 1);
    setCurrentDate(date);
    loadMonth(date);
  };
  const handleNewReminderClick = () => {
    setOpenModal(true);
  };
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setEditReminder({});
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setNewReminder((oldSt) => ({
      date: newReminder.date
        ? newReminder.date
        : moment(new Date()).format("YYYY-MM-DD[T]HH:mm"),
    }));
  };
  return (
    <div className="container">
      <h1>Calendar</h1>
      {days.length > 0 && (
        <section className="calendar-wrapper">
          <div style={{ padding: "12px" }}>
            <Header
              currentDate={currentDate}
              handleLeftClick={handleLeftClick}
              handleRightClick={handleRightClick}
              handleNewReminderClick={handleNewReminderClick}
            />
            <main className="grid-wrapper">
              {DAYS_OF_THE_WEEK.map((day) => {
                return (
                  <span className="header" key={day}>
                    {day}
                  </span>
                );
              })}
              {days.map((day) => (
                <DateCard
                  day={day}
                  currentDateId={currentDateId}
                  reminders={reminders}
                  handleCardClick={handleCardClick}
                />
              ))}
            </main>
          </div>
          <aside className="calendar-reminders">
            <h2>
              {currentDateId
                ? formatRemindersHeader(currentDateId)
                : "Reminders"}
            </h2>
            {reminders[currentDateId] &&
              reminders[currentDateId].length > 0 && (
                <h4>{`${reminders[currentDateId].length} ${
                  reminders[currentDateId].length > 1 ? "Items" : "Item"
                }`}</h4>
              )}
            {reminders[currentDateId] && (
              <ul>
                {reminders[currentDateId]
                  .sort((a, b) => +new Date(a.date) - +new Date(b.date))
                  .map((reminder) => (
                    <ReminderCard
                      key={reminder.key}
                      reminder={reminder}
                      handleReminderCardClick={handleReminderCardClick}
                    />
                  ))}
              </ul>
            )}
          </aside>
        </section>
      )}
      {openModal && (
        <AddReminderModal
          reminderDate={
            currentDateId
              ? moment(new Date(currentDateId)).format("YYYY-MM-DD[T]HH:mm")
              : moment(new Date()).format("YYYY-MM-DD[T]HH:mm")
          }
          handleAddReminder={handleAddReminder}
          reminder={newReminder}
          setReminder={setNewReminder}
          handleCloseModal={handleCloseModal}
        />
      )}
      {openEditModal && editReminder && (
        <EditReminderModal
          editReminder={editReminder}
          setEditReminder={setEditReminder}
          handleCloseEditModal={handleCloseEditModal}
          handleEditReminder={handleEditReminder}
        />
      )}
    </div>
  );
}

export default Calendar;
