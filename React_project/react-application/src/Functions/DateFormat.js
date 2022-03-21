export function DateFormat(date) {
  var dateToFormat = new Date(date),
    month = '' + (dateToFormat.getMonth() + 1),
    day = '' + dateToFormat.getDate(),
    year = dateToFormat.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}
