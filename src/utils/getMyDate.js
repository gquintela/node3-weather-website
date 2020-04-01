const week = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY"
];

const months = [
  "JANUARY",
  "FEBRUARY",
  "MARCH",
  "APRIL",
  "JUNE",
  "JULY",
  "AUGUST",
  "SEPTEMBER",
  "OCTOBER",
  "NOVEMBER",
  "DECEMBER"
];

getMyDate = timestamp => {
  date = new Date(timestamp * 1000);
  dayNumber = date.getDate();
  day = week[date.getDay()];
  month = months[date.getMonth()];
  return day + " " + dayNumber + ", " + month;
};

module.exports = getMyDate;
