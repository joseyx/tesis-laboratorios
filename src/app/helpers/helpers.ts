export function formatDateTime(datetime: string): string {
  const date = new Date(datetime);

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long', // Día de la semana
    year: 'numeric', // Año
    month: 'long', // Mes
    day: 'numeric', // Día
    hour: 'numeric', // Hora
    minute: 'numeric', // Minutos
    second: 'numeric', // Segundos
    hour12: true, // Formato 12 horas
    timeZone: 'UTC' // Zona horaria UTC
  };

  return new Intl.DateTimeFormat('es-ES', options).format(date);
}

export function formatDateToInputValue(date: string): string {
  const formattedDate = new Date(date);
  const year = formattedDate.getUTCFullYear();
  const month = String(formattedDate.getUTCMonth() + 1).padStart(2, '0'); // Meses son 0-11 en JavaScript
  const day = String(formattedDate.getUTCDate()).padStart(2, '0');
  const hours = String(formattedDate.getUTCHours()).padStart(2, '0');
  const minutes = String(formattedDate.getUTCMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}
