export default function useFormatDateTime() {
  function DateTimeFormat(date) {
    if (!date) return "";

    if (typeof date === 'string') {
      date = new Date(date);
    }

    if (isNaN(date)) return ""; // If the date is invalid, return an empty string

    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];

    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${month.toUpperCase()} ${day}, ${year}`;
  }

  return DateTimeFormat;
}
