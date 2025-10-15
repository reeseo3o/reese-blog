export function formatDate(date: string | Date, local: string) {
  const d = new Date(date);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  const res = d.toLocaleDateString(local, options);
  return res;
}
