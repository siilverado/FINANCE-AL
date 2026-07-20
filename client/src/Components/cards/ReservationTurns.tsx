import { type FC, useState } from 'react';

import { GoKebabVertical } from 'react-icons/go';

import { DeleteTurns } from '../../Functions/TurnQuery';

interface props {
  reservation: {
    date: string;
    hour: number;
    id: string;
  };
  fieldType: string;
}

const ReservationTurns: FC<props> = ({ reservation, fieldType }) => {
  const [showModal, setShowModal] = useState(false);
  const handleModal = () => setShowModal(!showModal);

  const handleDelete = () => {
    DeleteTurns({ id: reservation.id })
      .then(() => alert('Reserva eliminada'))
      .catch((err) => console.log(err));
  };

  return (
    <div className={`bg-white p-5 mt-3 relative `}>
      <ul>
        <li>Nombre: Joaquin</li>
        <li>Tipo de cancha: {fieldType}</li>
        <li>Dia: {reservation.date}</li>
        <li>
          Horario: {reservation.hour}:00hs -{' '}
          {reservation.hour + 1 === 24 ? 0 : reservation.hour + 1}:00hs
        </li>
      </ul>
      <button
        onClick={handleModal}
        className={`text-2xl transition-transform z-50 absolute right-5 top-5`}
      >
        <GoKebabVertical />
      </button>
      {showModal && (
        <>
          <button
            onClick={handleDelete}
            className="bg-bg cursor-pointer text-xl z-50 absolute top-0 right-16 pl-4 pr-10 py-5"
          >
            Quitar reserva
          </button>
          <div className="absolute z-10 top-0 left-0 w-full h-full bg-gradone opacity-60"></div>
        </>
      )}
    </div>
  );
};

export default ReservationTurns;
