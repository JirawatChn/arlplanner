export function hourToRange(hour: number): string {
  const start = hour.toString().padStart(2, "0");
  const end = ((hour + 1) % 24).toString().padStart(2, "0");
  return `${start}:00 - ${end}:00`;
}

  export function getCurrentHour(): number {
    return new Date().getHours(); // 0–23
  }