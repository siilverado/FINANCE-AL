import { type FC } from 'react';

import { type HoursType } from '../types/Hour.type';

interface Props {
  hours: HoursType[];
  handleSelect: (option: string) => void;
}

const HoursItems: FC<Props> = ({ hours, handleSelect }) => {
  return (
    <ul className='hoursScrollbar overflow-y-scroll max-h-[160px] relative left-1'>
      {hours.length > 0 &&
        hours.map((item, idx) => {
          return (
            <li
              key={item.id ?? idx}
              className='flex cursor-pointer py-1 pl-5 pr-3 active:bg-primary'
              onClick={() => handleSelect(item.start_hour.toString())}
            >
              <span className={`w-16 ${item.start_hour.length > 1 ? 'relative right-2' : ''}`}>
                {item.start_hour}:00hs
              </span>
              <span className='w-5 relative right-1'>-</span>
              <span className={`w-16 ${item.end_hour.length > 1 ? 'relative right-2' : ''}`}>
                {item.end_hour}:00hs
              </span>
            </li>
          );
        })}
    </ul>
  );
};

export default HoursItems;
