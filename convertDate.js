module.exports = function convertDate(inputDate) {
  let currentDate;
  if (!inputDate) currentDate = new Date();
  else currentDate = new Date(inputDate);
  console.log(currentDate)
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
    currentDate.getDay()
  ];
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ][currentDate.getMonth()];
  let currentDayOfMonth = currentDate.getDate()
  if (currentDayOfMonth < 10) currentDayOfMonth = "0" + currentDayOfMonth
  return `${weekday} ${month} ${currentDayOfMonth} ${currentDate.getFullYear()}`;
};
