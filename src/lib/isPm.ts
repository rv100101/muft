export function isPm(): boolean {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  // Assuming 12-hour time format
  const isPm = currentHour >= 12;

  return isPm;
}
