import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import { nanoid } from "nanoid";

import getDaysInMonth from "../utils/getDaysInMonth";

import "../sass/calendar.scss";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";

import {
  Button,
  Divider,
  IconButton,
  TextField,
  // Autocomplete,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Autocomplete from "react-google-autocomplete";

import { getForecastForDate } from "../utils/visualCrossing";
import { HomeContext } from "../context/home/HomeContext";
const DAYS_OF_THE_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
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

  const [editReminder, setEditReminder] = useState();
  const [reminderCity, setReminderCity] = useState("");
  const [reminderDate, setReminderDate] = useState(
    moment(new Date()).format("YYYY-MM-DD[T]HH:mm")
  );
  const [description, setDescription] = useState("");

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
  }, []);
  const formatRemindersHeader = (date) => {
    return moment(new Date(date)).format("MMMM Do");
  };

  const handleEditReminder = async () => {
    const dateId = new Date(editReminder.initialReminderDate).toDateString();
    await actions.editReminder(dateId, editReminder.id, editReminder);
    setOpenEditModal(false);
  };

  const handleAddReminder = async (e) => {
    e.preventDefault();

    const dateId = new Date(reminderDate).toDateString();
    const reminder = {
      id: nanoid(),
      text: description,
      city: reminderCity,
      initialReminderDate: reminderDate,
      date: reminderDate,
    };
    await actions.addReminder(dateId, reminder);
    setOpenModal(false);
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
            {/* <h2>{`${
              MONTHS[currentDate.getMonth()]
            } - ${currentDate.getFullYear()}`}</h2> */}
            <header>
              <nav>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    const date = new Date(currentDate);
                    date.setMonth(date.getMonth() - 1);
                    setCurrentDate(date);
                    loadMonth(date);
                  }}
                >
                  <ChevronLeftIcon />
                </IconButton>
                <h2>
                  <span>{MONTHS[currentDate.getMonth()]}</span>
                  {"  "}
                  <span style={{ fontWeight: "normal" }}>
                    {currentDate.getFullYear()}
                  </span>
                </h2>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    const date = new Date(currentDate);
                    date.setMonth(date.getMonth() + 1);
                    setCurrentDate(date);
                    loadMonth(date);
                  }}
                >
                  <ChevronRightIcon />
                </IconButton>
              </nav>
              <Button
                onClick={(e) => {
                  setOpenModal(true);
                }}
              >
                <AddIcon fontSize="small" />
                <span>New Reminder</span>
              </Button>
              {/* <button>
                <AddIcon fontSize="small" />
                <span>New Reminder</span>
              </button> */}
            </header>
            <main className="grid-wrapper">
              {DAYS_OF_THE_WEEK.map((day) => {
                return (
                  <span className="header" key={day}>
                    {day}
                  </span>
                );
              })}
              {days.map((day) => (
                <div
                  className={day.active ? "active" : ""}
                  style={{
                    backgroundColor: day.active ? "white" : "#dddddd",
                    position: "relative",
                    color:
                      day.id && day.id === currentDateId
                        ? "#7C3E66"
                        : "#243A73",
                    fontWeight:
                      day.id && day.id === currentDateId ? "bold" : "normal",
                  }}
                  onClick={(e) => {
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
                  }}
                  key={day.id}
                >
                  {day.day}
                  {reminders[day.id] && reminders[day.id].length > 0 && (
                    <span className="reminder-count">
                      <span>{reminders[day.id].length}</span>
                    </span>
                  )}
                </div>
              ))}
            </main>
          </div>
          <div className="calendar-reminders">
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
                  <li>
                    <div>
                      {`${reminder.city}, ${moment(
                        new Date(reminder.date)
                      ).format("h:mm A")}`}
                      {reminder.forecast && (
                        <div>{` (${reminder.forecast})`}</div>
                      )}
                    </div>
                    <span>{reminder.text}</span>
                    <IconButton
                      onClick={(e) => {
                        setEditReminder(reminder);
                        setOpenEditModal(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <Divider
                      sx={{ borderColor: "#F2EBE9", marginTop: "4px" }}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}
      {openModal && (
        <div className="modal">
          <Box
            component="form"
            onSubmit={handleAddReminder}
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
            <Autocomplete
              label="City"
              apiKey="AIzaSyDzehZryzqHYGsAnvRq3sVB7MCxNsoig5g"
              disablePortal
              placeholder="City"
              fullWidth
              // options={[{ label: "Teste" }]}
              onPlaceSelected={async (place) => {
                const cityName = place.address_components[0].long_name;
                setReminderCity(cityName);
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
              value={description}
              onChange={(e) => {
                if (description.length === 30 && e.target.value.length > 30) {
                  return;
                }
                setDescription(e.target.value);
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
              value={reminderDate}
              onChange={(e) => setReminderDate(e.target.value)}
              name="date"
              type="datetime-local"
              sx={{
                marginTop: "12px !important",
              }}
            />
            <Button
              // onClick={(e) => {
              //   const reminder = {
              //     title,
              //     reminderDate,
              //     description,
              //   };
              //   addReminder(currentDateId, reminder);
              //   setTitle("");
              //   setReminderDate("");
              //   setDescription("");
              //   setOpenModal(false);
              // }}
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
              onClick={() => {
                setOpenModal(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </div>
      )}
      {openEditModal && editReminder && (
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
                if (description.length === 30 && e.target.value.length > 30) {
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
              onClick={() => {
                setOpenEditModal(false);
                setReminderCity("");
                setReminderDate("");
                setDescription("");
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </div>
      )}
    </div>
  );
}

export default Calendar;
