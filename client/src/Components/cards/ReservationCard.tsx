import { type FC, useState } from 'react';
import toast from 'react-hot-toast';

import { MdClose, MdEdit } from 'react-icons/md';
import Swal from 'sweetalert2';

import { DeleteReservation } from '../../Functions/ReservationsQuery';
import { type GetReservationType } from '../../types/Reservation.type';
import PrimaryButton from '../PrimaryButton';

interface Props {
  reservation: GetReservationType;
  deleteReservations: (deletedId: string) => boolean;
}

const ReservationCard: FC<Props> = ({ reservation, deleteReservations }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => setOpen(!open);
  const handleCancel = () => {
    const id = reservation.id;
    Swal.fire({
      title: 'Alerta!',
      text: '¿Desea cancelar esta reserva?',
      footer: `<b>Advertencia:</b> &nbsp Una vez cancelada la reserva, el turno estara disponible para otro usuario.`,
      icon: 'question',
      confirmButtonText: 'Cancelar',
      confirmButtonColor: '#EE4B2B',
      showCancelButton: true,
      cancelButtonText: 'Volver',
      cancelButtonColor: '#4CAF50 ',
    }).then((result) => {
      if (result.isConfirmed) {
        DeleteReservation(id)
          .then(() => {
            if (deleteReservations(id)) {
              toast.error('No se pudo cancelar la reserva');
            }
            // throw new Error('No se pudo cancelar la reserva')};
          })
          .then(() =>
            toast.success('Reserva cancelada exitosamente!', {
              style: {
                background: '#F5F5F5',
                color: '#4CAF50',
              },
            }),
          )
          .catch((err) => console.log(err));
      }
    });
  };
  return (
    <div className='flex flex-col w-full bg-secondary px-5 py-2'>
      <span className='opacity-70'>{reservation?.sportfield?.name}</span>
      <div className='flex flex-row w-full justify-between items-center'>
        <span className='text-lg'>{reservation?.sportfield?.sportsComplex?.address}</span>
        <div className='flex flex-row gap-5 text-2xl'>
          <button onClick={handleClick}>
            <MdEdit />
          </button>
          {open && (
            <>
              <span className='backdrop-blur-sm w-full h-full absolute left-0 -top-2 z-[200]'></span>
              <div className='absolute left-0 w-full h-full top-2 text-xl  flex z-[300] justify-center items-center'>
                <div className='w-full bg-white shadow-lg h-auto rounded-lg lg:w-[600px]'>
                  <span
                    onClick={handleClick}
                    className='cursor-pointer text-2xl flex justify-end mr-2 mt-2'
                  >
                    <MdClose />
                  </span>
                  <div className='mx-[5%] my-5 flex flex-col bg-[#aaa3] px-5 py-2 rounded-lg'>
                    <span className='opacity-70'>{reservation?.sportfield?.name}</span>
                    <span className='text-lg'>
                      {reservation?.sportfield?.sportsComplex?.address}
                    </span>
                  </div>
                  <div className='flex flex-col gap-5 pb-2 mb-2 mx-2'>
                    <div className='relative flex flex-row items-center justify-between p-2'>
                      <span className='text-lg'>Informacion del partido</span>
                    </div>
                    <div className='bg-[#aaa2] p-2'>
                      <span className='block'>{reservation?.sportfield?.description}</span>
                      <span className='block'>
                        Capacidad: {reservation?.sportfield?.capacity} personas -{' '}
                        {reservation?.sportfield?.dimensions} m²
                      </span>
                    </div>
                    <div className='bg-[#aaa2] p-2'>
                      <div className='flex flex-row justify-between w-full'>
                        <span>Dia</span>
                        <span>Miercoles {reservation.date}</span>
                      </div>
                      <div className='flex flex-row justify-between w-full'>
                        <span>Hora</span>
                        <span>{reservation.hour}:00 hs</span>
                      </div>
                      <div className='flex flex-row justify-between w-full'>
                        <span>Duracion</span>
                        <span>60 minutos</span>
                      </div>
                    </div>
                    <span className='p-2'>
                      Importante: Este complejo no exigio una carga monetaria como garantia. Se
                      solicita en caso de cancelar la reserva, hacerlo con 24 horas de antelacion.
                    </span>
                    <div className='flex justify-center'>
                      <PrimaryButton text='CANCELAR' alternative={true} onClick={handleCancel} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
