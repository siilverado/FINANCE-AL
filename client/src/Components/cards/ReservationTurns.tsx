import { type FC, useState } from 'react';
import toast from 'react-hot-toast';

import { GoKebabVertical } from 'react-icons/go';
import Swal from 'sweetalert2';

import { DeleteTurns } from '../../Functions/TurnQuery';

interface props {
  reservation: {
    date: string;
    hour: number;
    id: string;
  };
  fieldType: string;
  user: { firstName: string; lastName: string; email: string };
  handleReload: () => void;
}

const ReservationTurns: FC<props> = ({ reservation, fieldType, handleReload, user }) => {
  const [showModal, setShowModal] = useState(false);
  const handleModal = () => setShowModal(!showModal);

  const name = `${user.firstName} ${user.lastName} - ${user.email}`;

  const handleDelete = () => {
    Swal.fire({
      title: 'Cuidado!',
      text: 'Esta por eliminar una reserva!',
      footer: `<b>Advertencia:</b> &nbsp Una vez eliminada la reserva, estara disponible para otros usuarios.`,
      icon: 'warning',
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#808080',
      showCancelButton: true,
      cancelButtonText: 'Volver',
      cancelButtonColor: '#4CAF50',
    })
      .then((result) => {
        if (result.isConfirmed) {
          DeleteTurns({ id: reservation.id })
            .then(() => toast.success('Reserva eliminada', { duration: 2000 }))
            .then(() => handleReload())
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={`bg-white p-5 mt-3 relative `}>
      <ul>
        <li>Nombre: {name}</li>
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
            className='bg-bg cursor-pointer text-xl z-50 absolute top-0 right-16 pl-4 pr-10 py-5'
          >
            Quitar reserva
          </button>
          <div className='absolute z-10 top-0 left-0 w-full h-full bg-gradone opacity-60'></div>
        </>
      )}
    </div>
  );
};

export default ReservationTurns;
