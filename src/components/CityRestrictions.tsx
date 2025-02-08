import { useEffect, useState, type FC } from 'react';
import { DayPicker } from 'react-day-picker';
import { es } from 'react-day-picker/locale';
import 'react-day-picker/style.css';
import type { Restriction } from '../core/restriction.interface';
interface Props {
  city: string;
}

export const CityRestrictions: FC<Props> = ({ city }) => {
  const [show, setShow] = useState(false);
  const [restrictions, setRestrictions] = useState<Restriction[]>([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date>();

  const getRestrictions = async () => {
    const restrictions = await fetch(`/api/restrictions/${city}`).then(
      async (res) => await res.json(),
    );
    return restrictions;
  };

  const getRestrictionsByDate = (date: Date | null | undefined) => {
    if (!date) {
      return [];
    }

    const restrictionsByDate = restrictions.filter((restriction) => {
      return formatDDMMYY(new Date(restriction.date)) === formatDDMMYY(date);
    });

    return restrictionsByDate;
  };

  useEffect(() => {
    if (show && restrictions.length === 0) {
      setLoading(true);
      getRestrictions()
        .then((res) => {
          setRestrictions(res);
          setDate(new Date());
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [show]);

  const formatDDMMYY = (date: Date | null | undefined) => {
    if (!date) {
      return '';
    }
    const stringDate = date.toISOString().split('T')[0];
    const [year, month, day] = stringDate.split('-');
    return `${day}/${month}/${year}`;
  };

  const RestrictionsTable = () => {
    if (!date) {
      return (
        <div>
          <p>Por favor seleccione una fecha</p>
        </div>
      );
    }

    return getRestrictionsByDate(date).length ? (
      <div className="flex flex-col gap-4">
        <p className="text-lg">
          Restricciones para el <b>{formatDDMMYY(date)}</b>
        </p>

        <table>
          <thead>
            <tr>
              <th>Vehículo</th>
              <th>Placas con restricción</th>
              <th>Información</th>
            </tr>
          </thead>
          <tbody>
            {getRestrictionsByDate(date).map((restriction) => (
              <tr key={restriction.vehicle}>
                <td>{restriction.vehicle}</td>
                <td>{restriction.plates}</td>
                <td>{restriction.information || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <div>
        <p className="text-lg">
          Ups, a un no hay restricciones para la fecha{' '}
          <b>{formatDDMMYY(date)}</b>
        </p>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-10 mt-4">
      <div className="flex justify-center">
        <button
          onClick={() => setShow(!show)}
          className="border px-4 rounded 
          cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          {show ? 'Ocultar' : 'Mostrar'} calendario
        </button>
      </div>
      {loading ? <div>Cargando...</div> : null}
      {show && !loading ? (
        <div className="flex flex-col gap-10 ">
          <div className="flex justify-center">
            <DayPicker
              locale={es}
              mode="single"
              selected={date}
              onSelect={setDate}
              className="uppercase"
              onMonthChange={() => setDate(undefined)}
            />
          </div>
          <RestrictionsTable />
        </div>
      ) : null}
    </div>
  );
};
