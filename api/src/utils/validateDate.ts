export function validateDate(dateString) {
  const datePattern = /^\d{4}-(0\d|1[0-2])-(0\d|1\d|2\d|3[01])$/;

  if (!datePattern.test(dateString)) {
    return false;
  }

  const [year, month, day] = dateString.split('-').map(Number);

  if (month < 1 || month > 12) {
    return false;
  }

  const maxDays = new Date(year, month, 0).getDate();
  if (day < 1 || day > maxDays) {
    return false;
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return false;
  }

  return true;
}
