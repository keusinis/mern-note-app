export function formatDate(dateInput) {
  const date = new Date(dateInput);

  if (isNaN(date)) return "Invalid Date";

  const options = { month: "long", day: "numeric", year: "numeric" };
  const datePart = date.toLocaleDateString(undefined, options);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${datePart} ${hours}:${minutes}`;
}

export function formatDateOnly(dateInput) {
  const date = new Date(dateInput);
  if (isNaN(date)) return "Invalid Date";

  const options = { month: "long", day: "numeric", year: "numeric" };
  return date.toLocaleDateString(undefined, options);
}

export function formatTimeOnly(dateInput) {
  const date = new Date(dateInput);
  if (isNaN(date)) return "Invalid Time";

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${hours}:${minutes}`;
}
