export function convertDateToTimestamp(date: Date): string {
  return date.toISOString().substr(0, 23).replace("T", " ");
}

