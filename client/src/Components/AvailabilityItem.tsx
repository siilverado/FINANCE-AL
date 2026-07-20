import { useState, type FC, type ChangeEvent } from 'react';

import { HiPencil } from 'react-icons/hi';
import { TiDeleteOutline, TiTick } from 'react-icons/ti';

import { type HoursType } from '../types/Hour.type';

interface Props {
  initialRange: HoursType;
  createMode?: boolean;
  handleConfirm: (range: HoursType) => void;
  handleDelete: (range: HoursType) => void;
}

const formatHour = (hour: string) => (parseInt(hour) < 10 ? '0' + hour : hour);

const AvailabilityItem: FC<Props> = ({
  initialRange,
  handleConfirm,
  handleDelete,
  createMode = false,
}) => {
  const [range, setRange] = useState({ ...initialRange });
  const [editing, setEditing] = useState(createMode);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value);
    if (value < 0) value = 24;
    if (value > 24) value = 0;
    if (isNaN(value)) value = 0;
    setRange({
      ...range,
      [e.target.name]: value,
    });
  };

  const onConfirm = () => {
    setEditing(false);

    handleConfirm(range);
  };

  const onCancel = () => {
    setEditing(false);
    handleDelete(range);
  };

  return (
    <li className='flex justify-evenly items-center cursor-pointer py-1 pl-5 pr-3'>
      <div className='flex justify-evenly grow'>
        <div className={`flex gap-3`}>
          <span className='flex'>
            {editing ? (
              <input
                name='start_hour'
                type='number'
                className='w-5 text-right border-black border-b-2 focus:outline-none'
                value={+range.start_hour || ''}
                onChange={handleChange}
              />
            ) : (
              formatHour(range.start_hour)
            )}
            :00hs
          </span>
        </div>
        <span>-</span>
        <div className={`flex gap-3`}>
          <span>
            {editing ? (
              <input
                name='end_hour'
                type='number'
                className='w-5 text-right border-black border-b-2 focus:outline-none'
                value={+range.end_hour || ''}
                onChange={handleChange}
              />
            ) : (
              formatHour(range.end_hour)
            )}
            :00hs
          </span>
        </div>
      </div>
      <div className='flex gap-2'>
        {editing ? (
          <button type='button' onClick={onConfirm}>
            <TiTick />
          </button>
        ) : (
          <button type='button' onClick={() => setEditing(true)}>
            <HiPencil />
          </button>
        )}
        <button type='button' onClick={onCancel}>
          <TiDeleteOutline />
        </button>
      </div>
    </li>
  );
};

export default AvailabilityItem;
