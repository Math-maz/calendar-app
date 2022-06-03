import React, { useState, useEffect } from "react";
import getDaysInMonth from "../utils/getDaysInMonth";
import "../sass/calendar.scss";
const DAYS_OF_THE_WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
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
  const [days, setDays] = useState([]);
  const [reminders, setReminders] = useState({});
  const [currentReminder, setCurrentReminder] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentDateId, setCurrentDateId] = useState();

  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState("");
  const [reminderDate, setReminderDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    // const currentDate = new Date();
    const currentMonth1Based = currentDate.getMonth() + 1;

    const daysOfCurrentMonth = getDaysInMonth(
      currentMonth1Based,
      currentDate.getFullYear()
    );
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );

    const placeholderDays = [];

    if (new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)) {
      const lastMonthDays = getDaysInMonth(
        currentMonth1Based - 1,
        currentDate.getFullYear()
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
          currentDate.getFullYear(),
          currentDate.getMonth(),
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
  }, []);
  const addReminder = (dateId, reminderData) => {
    let remindersCp = { ...reminders };
    if (!remindersCp[dateId]) {
      remindersCp[dateId] = [reminderData];
    } else {
      remindersCp[dateId].push(reminderData);
    }
    setReminders(remindersCp);
  };
  return (
    <div className="container">
      <h1>Calendar</h1>
      {/* <header>
        {DAYS_OF_THE_WEEK.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </header> */}
      <h2>{`${
        MONTHS[currentDate.getMonth()]
      } - ${currentDate.getFullYear()}`}</h2>
      {days.length > 0 && (
        <main className="grid-wrapper">
          {DAYS_OF_THE_WEEK.map((day) => (
            <span key={day}>{day}</span>
          ))}
          {days.map((day) => (
            <div
              className={day.active ? "active" : ""}
              style={{
                backgroundColor: day.active ? "white" : "#dddddd",
                position: "relative",
              }}
              key={day.id}
            >
              {day.day}
              <i
                onClick={() => {
                  setCurrentDateId(
                    `${new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth(),
                      day.day
                    ).toDateString()}`
                  );
                  setOpenModal(true);
                }}
              >
                +
              </i>
              {reminders[day.id] &&
                reminders[day.id].slice(0, 3).map((reminder) => (
                  <div
                    onClick={(e) => {
                      setCurrentReminder(reminder);
                    }}
                    className="reminders"
                  >
                    {reminder.title}
                  </div>
                ))}
            </div>
          ))}
        </main>
      )}
      {openModal && (
        <div className="modal">
          <div className="modal-card">
            <span>Add Reminder</span>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title of reminder"
            />

            <label htmlFor="date">Date</label>
            <input
              value={reminderDate}
              onChange={(e) => setReminderDate(e.target.value)}
              name="date"
              type="datetime-local"
            />

            <label htmlFor="description">Description</label>
            <input
              value={description}
              onChange={(e) => {
                if (description.length === 30 && e.target.value.length > 30) {
                  return;
                }
                setDescription(e.target.value);
              }}
              name="description"
            />
            <button
              onClick={(e) => {
                const reminder = {
                  title,
                  reminderDate,
                  description,
                };
                addReminder(currentDateId, reminder);
                setTitle("");
                setReminderDate("");
                setDescription("");
                setOpenModal(false);
              }}
            >
              Create
            </button>
            <i
              onClick={() => {
                setOpenModal(false);
              }}
            >
              X
            </i>
          </div>
        </div>
      )}
      {Object.keys(currentReminder).length > 0 && (
        <div className="modal">
          <div className="reminder-modal-card">
            <span>{currentReminder.title}</span>
            <section>
              <div>{currentReminder.reminderDate}</div>
              <div>{currentReminder.description}</div>
            </section>
            <i
              onClick={() => {
                setCurrentReminder({});
              }}
            >
              X
            </i>
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;
