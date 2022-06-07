import React from "react";

export default function DateCard({
  day,
  reminders,
  currentDateId,
  handleCardClick,
}) {
  return (
    <div
      className={day.active ? "active" : ""}
      style={{
        backgroundColor: day.active ? "white" : "#dddddd",
        position: "relative",
        color: day.id && day.id === currentDateId ? "#7C3E66" : "#243A73",
        fontWeight: day.id && day.id === currentDateId ? "bold" : "normal",
      }}
      onClick={(e) => handleCardClick(day)}
      key={day.id}
    >
      {day.day}
      {reminders[day.id] && reminders[day.id].length > 0 && (
        <span className="reminder-count">
          <span>{reminders[day.id].length}</span>
        </span>
      )}
    </div>
  );
}
