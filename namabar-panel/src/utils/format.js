export function formatTimestamp(ts) {
  if (!ts) return '-';
  const date = new Date(ts * 1000);
  return new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function formatPhone(phone) {
  if (!phone) return '-';
  return phone;
}
