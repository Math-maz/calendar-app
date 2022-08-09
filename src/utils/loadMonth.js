import getDaysInMonth from "./getDaysInMonth";

const getMonthDays = (date) => {
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
  return placeholderDays;
};
export default getMonthDays;
