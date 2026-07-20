import { useState, type FC } from 'react';

import { IoMdAdd } from 'react-icons/io';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { TiDeleteOutline } from 'react-icons/ti';

import { type HoursType } from '../types/Hour.type';

import AvailabilityItem from './AvailabilityItem';
import HoursItems from './HoursItems';

interface Props {
  hours: HoursType[];
  changeAvailability: (newAvailability: HoursType[]) => void;
}

const AvailabilityRange: FC<Props> = ({ hours, changeAvailability }) => {
  const [open, setOpen] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleClick = () => setOpen(!open);
  const handleConfirm = (newRange: HoursType) => {
    if (!newRange.id) {
      changeAvailability([...hours, newRange]);
      setAdding(false);
      return;
    }

    const filteredRanges = hours.filter((range) => range.id !== newRange.id);

    changeAvailability([...filteredRanges, newRange]);
    setAdding(false);
  };

  const handleDelete = (removedRange: HoursType) => {
    if (!removedRange.id) {
      setAdding(false);
      return;
    }

    changeAvailability([...hours.filter((range) => range.id !== removedRange.id)]);
  };

  return (
    <div className="w-10/12 relative mt-12">
      <div className="flex justify-between pr-2 divide-black divide-solid border-b-2">
        <label htmlFor="addAvailability" className="cursor-pointer">
          Disponibilidad
        </label>
        <button
          id="addAvailability"
          type="button"
          onClick={handleClick}
          className={`ml-12 text-xl transition-transform ${open ? 'rotate-90' : '-rotate-90'}`}
        >
          <MdKeyboardArrowLeft />
        </button>
      </div>
      {open && (
        <div className="z-10 w-full absolute bg-white rounded-md px-1 shadow-lg">
          <ul className="hoursScrollbar py-3 overflow-y-scroll max-h-[160px] relative left-1">
            {hours.length > 0 &&
              hours.map((range, idx) => {
                return (
                  <AvailabilityItem
                    key={range.id ?? idx}
                    initialRange={range}
                    handleConfirm={handleConfirm}
                    handleDelete={handleDelete}
                  />
                );
              })}
            {adding && (
              <AvailabilityItem
                initialRange={{ start_hour: '0', end_hour: '0' }}
                createMode={true}
                handleConfirm={handleConfirm}
                handleDelete={handleDelete}
              />
            )}
          </ul>
          {!adding && (
            <div className="flex justify-center items-center p-2 w-full">
              <button type="button" className="px-2" onClick={() => setAdding(!adding)}>
                Agregar
              </button>
              <IoMdAdd />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AvailabilityRange;
