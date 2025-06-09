export const getYearMonthDayString = (date) => {
  return date.toISOString().slice(0, 10);
};
