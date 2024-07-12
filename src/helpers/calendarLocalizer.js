import { format, getDay, parse, startOfWeek } from 'date-fns';
import { es } from 'date-fns/locale';
import { dateFnsLocalizer } from 'react-big-calendar';
const locales = {
  'es-Es': es,
};

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
