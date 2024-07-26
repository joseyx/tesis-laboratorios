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
