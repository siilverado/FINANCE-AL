import { type FC, useState, useEffect } from 'react';

import HoursList from './HoursList';
import MyCalendar from './MyCalendar';

interface props {
  openMenu: boolean;
  handleSelectHour: (option: string) => void;
  handleSelectCalendar: (option: string) => void;
  handleCloseMenu: () => void;
  selectedDate: string;
}

const SFDetailMenu: FC<props> = (props) => {
  const { handleSelectHour, handleSelectCalendar, handleCloseMenu, selectedDate } = props;
  const [openHours, setOpenHours] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);

  const handleOpenHours = (option: string | null) => {
    setOpenHours(!openHours);
    option && handleSelectHour(option);
    handleCloseMenu();
  };

  const handleOpenCalendar = (option: string | null) => {
    setOpenCalendar(!openCalendar);
    option && handleSelectCalendar(option);
    handleCloseMenu();
  };

  const handleClickHours = () => {
    setOpenHours(!openHours);
    setOpenCalendar(false);
  };
  const handleClickCalendar = () => {
    setOpenCalendar(!openCalendar);
    setOpenHours(false);
  };

  return (
    <>
      <ul
        className={`items-center absolute right-12 top-[50px] h-auto w-52 bg-white shadow-2xl rounded-md flex-col`}
      >
        <li
          onClick={handleClickCalendar}
          className="pl-5 py-5 hover:bg-primary w-full cursor-pointer"
        >
          Cambiar día
        </li>
        <li className="pl-5 py-5 hover:bg-primary w-full cursor-pointer" onClick={handleClickHours}>
          Cambiar horario
        </li>
        {openCalendar && (
          <div className="absolute top-16 lg:top-0 -right-5 lg:-right-[425px]">
            <MyCalendar handleClick={handleOpenCalendar} />
          </div>
        )}
        {openHours && (
          <div className="absolute top-32 -left-24 lg:top-0 lg:-left-full">
            <HoursList
              getAllHours={false}
              handleSelect={handleOpenHours}
              selectedDate={selectedDate}
            />
          </div>
        )}
      </ul>
    </>
  );
};

export default SFDetailMenu;
