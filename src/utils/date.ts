export function convertDateToTimestamp(date: Date): string {
  return date.toISOString().substr(0, 23).replace("T", " ");
}

export function convertTimeSecondToTimestamp(timeSecond: string): string {
  const date = new Date(Number(timeSecond) * 1000);
  return convertDateToTimestamp(date);
}
