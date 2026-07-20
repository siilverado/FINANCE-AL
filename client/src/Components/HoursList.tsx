import { type FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getSportAvailability } from '../Functions/SportFieldsQuery';

import HoursItems from './HoursItems';

interface HoursType {
  end_hour: string;
  id: string;
  start_hour: string;
}

interface hoursProps {
  getAllHours: boolean;
  handleSelect: (option: string) => void;
  selectedDate?: string;
}

const HoursList: FC<hoursProps> = ({ getAllHours, handleSelect, selectedDate }) => {
  const { id = '' } = useParams();

  const [hours, setHours] = useState<HoursType[]>([]);

  useEffect(() => {
    if (getAllHours) {
      setHours(allHours);
    } else {
      selectedDate &&
        getSportAvailability(selectedDate, id)
          .then((data) => data && setHours(data))
          .catch((err) => console.log(err));
    }
  }, [id, getAllHours]);

  const allHours: HoursType[] = [];
  for (let i = 7; i <= 23; i++) {
    const endHour = i === 23 ? 0 : i + 1;
    const addedHour = {
      end_hour: endHour.toString(),
      id: i.toString(),
      start_hour: i.toString(),
    };
    allHours.push(addedHour);
  }

  return (
    <>
      <div className="bg-white py-5 rounded-md px-1 shadow-lg">
        <span className="mb-2 divide-black border-b-[1px] mx-2 px-1 text-center block w-[90%]">
          {hours.length
            ? getAllHours
              ? 'Horarios'
              : 'Horarios disponibles'
            : 'No hay horarios disponibles'}
        </span>
        <HoursItems hours={hours} handleSelect={handleSelect} />
      </div>
    </>
  );
};

export default HoursList;
