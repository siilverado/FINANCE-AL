import { type FC, useState } from 'react';

import { MdKeyboardArrowLeft } from 'react-icons/md';

import { type TurnType } from '../../types/Turn.type';

import ReservationTurns from './ReservationTurns';

interface TurnProp {
  turn: TurnType;
  handleReload: () => void;
}

const TurnsCard: FC<TurnProp> = ({ turn, handleReload }) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(!open);

  return (
    <div className={`shadow-lg transition-all`}>
      <div className="bg-grey p-5 flex justify-between items-start z-100 relative">
        <div className="flex flex-col">
          <span className="opacity-60">{turn.sportsComplex.name}</span>
          <span>{turn.name}</span>
        </div>
        <button
          onClick={handleClick}
          className={`${open ? 'rotate-90' : '-rotate-90'} text-2xl transition-transform`}
        >
          <MdKeyboardArrowLeft />
        </button>
      </div>
      <div className={`${open ? 'flex' : 'hidden'} flex-col gap-2 bg-grey`}>
        {turn.reservation.map((item) => {
          return (
            <ReservationTurns
              key={item.id}
              reservation={item}
              fieldType={turn.fieldType}
              user={item.user}
              handleReload={handleReload}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TurnsCard;
