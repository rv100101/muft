export function isPm(): boolean {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  // Assuming 12-hour time format
  const isPm = currentHour >= 12;

  return isPm;
}

export function is6Pm(currentTime: Date): boolean {
  const hours: number = currentTime.getHours();
  return hours >= 15 || hours < 6;
}
