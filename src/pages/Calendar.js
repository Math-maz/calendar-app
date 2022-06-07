import React, { useState, useEffect, useContext } from "react";

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
import getDaysInMonth from "../utils/getDaysInMonth";

function Calendar(props) {
  // your calendar implementation Goes here!
  // Be creative
  const {
    state: { reminders },
    actions,
  } = useContext(HomeContext);
  const [days, setDays] = useState([]);
  // const [reminders, setReminders] = useState({});

  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentDateId, setCurrentDateId] = useState();

  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [newReminder, setNewReminder] = useState({
    date: moment(new Date()).format("YYYY-MM-DD[T]HH:mm"),
  });
  const [editReminder, setEditReminder] = useState({});

  const loadMonth = (date) => {
    const currentMonth1Based = date.getMonth() + 1;

    const daysOfCurrentMonth = getDaysInMonth(
      currentMonth1Based,
      date.getFullYear()
    );
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);

    const placeholderDays = [];

    if (new Date(date.getFullYear(), date.getMonth(), 1)) {
      const lastMonthDays = getDaysInMonth(
        currentMonth1Based - 1,
        date.getFullYear()
      );
      // console.log(lastMonthDays);
      const lastMonthDaysRequired = [];
      for (
        let i = lastMonthDays;
        i > lastMonthDays - firstDayOfMonth.getDay();
        i--
      ) {
        lastMonthDaysRequired.push({ day: i, active: false });
      }
      placeholderDays.push(...lastMonthDaysRequired.reverse());
    }

    for (let i = 0; i < daysOfCurrentMonth; i++) {
      placeholderDays.push({
        id: `${new Date(
          date.getFullYear(),
          date.getMonth(),
          i + 1
        ).toDateString()}`,
        day: i + 1,
        active: true,
      });
    }
    const DAYS_IN_A_WEEK = 7;
    for (let i = 1; i < DAYS_IN_A_WEEK - firstDayOfMonth.getDay() - 1; i++) {
      placeholderDays.push({ day: i, active: false });
    }
    setDays(placeholderDays);
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

  const handleAddReminder = async (e) => {
    e.preventDefault();

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
    setNewReminder({
      date: moment(new Date()).format("YYYY-MM-DD[T]HH:mm"),
    });
  };
  return (
    <div className="container">
      <h1>Calendar</h1>
      {/* <header>
        {DAYS_OF_THE_WEEK.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </header> */}
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
                {reminders[currentDateId].map((reminder) => (
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
