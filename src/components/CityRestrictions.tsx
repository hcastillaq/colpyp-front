import { useEffect, useState, type FC } from 'react';
import type { Calendar } from '../core/calendar.interface';
interface Props {
  city: string;
}

const monthsNames = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

export const CityRestrictions: FC<Props> = ({ city }) => {
  const [show, setShow] = useState(false);
  const [calendars, setCalendars] = useState<Calendar[]>([]);
  const [month, setMonth] = useState<string | null>(null);
  const [calendar, setCalendar] = useState<Calendar | null>(null);

  const handleClick = async () => {
    if (calendars.length === 0) {
      const response = await fetch(`/api/calendar/${city}`).then((res) =>
        res.json(),
      );
      setCalendars(response);
      const currentMonth = new Date().getMonth();
      setMonth(monthsNames[currentMonth]);
    }

    setShow(!show);
  };

  useEffect(() => {
    const calendar = getCalendarByMonth(month);
    setCalendar(calendar);
  }, [month]);

  const getCalendarByMonth = (month: string | null | undefined) => {
    if (!month) return null;
    return calendars.find((calendar) => calendar.month === month) || null;
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const month$ = e.target.value;
    setMonth(month$);
  };

  const formatDDMMYY = (date: string) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-center">
        <button
          onClick={handleClick}
          className="border px-4 rounded 
          cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          {show ? 'Ocultar' : 'Mostrar'} calendario
        </button>
      </div>

      {show ? (
        <div className="flex flex-col gap-10 ">
          <div className="flex justify-center ">
            <select
              value={month || ''}
              className="border rounded px-2 min-w-60 text-center"
              onChange={handleMonthChange}
            >
              {monthsNames.map((name) => (
                <option key={name} value={name}>
                  {name.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {calendar ? (
            <div className="flex flex-col gap-10">
              {calendar.dates.map((item) => {
                return (
                  <div className="flex flex-col gap-2" key={item.date}>
                    <div className="text-center">
                      <span className="font-bold text-lg">
                        {formatDDMMYY(item.date)}
                      </span>
                    </div>
                    <table>
                      <thead>
                        <tr>
                          <th className="capitalize">vehículo</th>
                          <th className="capitalize">placas con restricción</th>
                          <th className="capitalize">información</th>
                        </tr>
                      </thead>
                      <tbody>
                        {item.restrictions.map((restriction) => {
                          return (
                            <tr key={`${item.date}-${restriction.vehicle}`}>
                              <td>{restriction.vehicle}</td>
                              <td>{restriction.plates}</td>
                              <td>{restriction.information || 'N/A'}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-lg">
              ups, a un no hay restricciones para el mes de{' '}
              <b> {month?.toUpperCase()}.</b>
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
};
