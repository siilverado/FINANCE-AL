export function parseDate(date: string): Date {
  const dateString = date.split('/');
  return new Date(`${dateString[1]}/${dateString[0]}/${dateString[2]}`);
}
