import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { AiOutlineInfoCircle } from 'react-icons/ai';
import Swal from 'sweetalert2';

import Layout from '../../Components/layout/Layout';
import PrimaryButton from '../../Components/PrimaryButton';
import SFDetailMenu from '../../Components/SFDetailMenu';
import { PostReservations } from '../../Functions/ReservationsQuery';
import { getSportDetail } from '../../Functions/SportFieldsQuery';
import { type AppUser } from '../../types/App.type';
import { type sportData } from '../../types/Sport.type';

const SFDetail = () => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const userEmail = useSelector((state: AppUser) => state.user?.user?.email);

  const queryParams = new URLSearchParams(location.search);
  const rHour = queryParams.get('rHour') ?? '';
  const date = queryParams.get('date') ?? '';

  const [data, setData] = useState<sportData>({
    id: '',
    images: [''],
    name: '',
    description: '',
    capacity: 0,
    dimensions: '',
    fieldType: '',
    sportsComplex: {
      lat: 0,
      lng: 0,
      ubication: '',
      parking: false,
      grill: false,
      locker: false,
      bathrooms: false,
      restobar: false,
      showers: false,
      address: '',
      availability: [
        {
          end_hour: '',
          id: '',
          start_hour: '',
        },
      ],
    },
  });
  const [openMenu, setOpenMenu] = useState(false);
  const handleCloseMenu = () => setOpenMenu(false);

  const [selectedHour, setSelectedHour] = useState<string>(rHour);
  const handleSelectHour = (option: string) => setSelectedHour(option);

  const [selectedDate, setSelectedDate] = useState(`${date}`);
  const handleSelectCalendar = (option: string) => setSelectedDate(option);

  const handleCancel = () => window.history.back();
  const handleConfirm = () => {
    Swal.fire({
      title: 'Reserva!',
      text: 'Una reserva es un compromiso de asistencia',
      footer: `<b>Advertencia:</b> &nbsp Ante cualquier eventualidad inesperada, informe con anticipación, Gracias`,
      icon: 'warning',
      confirmButtonText: 'Confirmar Reservación',
      confirmButtonColor: '#808080',
      showCancelButton: true,
      cancelButtonText: 'Modificar Reservacion',
      cancelButtonColor: '#4CAF50',
    })
      .then((result) => {
        if (result.isConfirmed) {
          PostReservations({
            hour: Number(selectedHour),
            date: selectedDate,
            sportfieldId: id,
            userEmail,
          })
            .then(() =>
              toast.success('Cancha reservada', {
                style: {
                  background: '#F5F5F5',
                  color: '#4CAF50',
                },
              }),
            )
            .catch((err) => console.log(err));
          return setTimeout(() => navigate('/inicio'), 1000);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleClick = () => setOpenMenu(!openMenu);

  useEffect(() => {
    getSportDetail(id)
      .then((data) => data && setData(data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <Layout title="Detalles de la reserva">
      <div className="flex flex-row w-full justify-center gap-20">
        <div className="flex flex-col gap-5 w-full lg:w-[550px] lg:mt-12">
          <div className="mx-[5%] h-10 my-5 flex flex-col bg-[#aaa3] px-5 py-2 rounded-lg">
            <span className="opacity-70">{data?.name}</span>
            <span className="text-lg">{data?.sportsComplex?.ubication}</span>
          </div>
          <div className="flex flex-col gap-5 bg-white pb-2 mb-10 mx-2 shadow-lg rounded-lg">
            <div className="relative flex flex-row items-center justify-between p-5">
              <span className="text-lg">Informacion del partido</span>
              <button onClick={handleClick} className="text-3xl">
                <AiOutlineInfoCircle />
              </button>
              {openMenu && (
                <SFDetailMenu
                  openMenu={openMenu}
                  handleSelectHour={handleSelectHour}
                  handleSelectCalendar={handleSelectCalendar}
                  handleCloseMenu={handleCloseMenu}
                  selectedDate={selectedDate}
                />
              )}
            </div>
            <div className="bg-[#aaa2] p-5">
              <span className="block">{data?.description}</span>
              <span className="block">
                Capacidad: {data?.capacity} personas - {data?.dimensions} m²
              </span>
            </div>
            <div className="bg-[#aaa2] p-5">
              <div className="flex flex-row justify-between w-full">
                <span>Dia</span>
                <span>Miercoles {selectedDate}</span>
              </div>
              <div className="flex flex-row justify-between w-full">
                <span>Hora</span>
                <span>{selectedHour}:00 hs</span>
              </div>
              <div className="flex flex-row justify-between w-full">
                <span>Duracion</span>
                <span>60 minutos</span>
              </div>
            </div>
            <span className="p-5">
              Importante: Este complejo no exigio una carga monetaria como garantia. Se solicita en
              caso de cancelar la reserva, hacerlo con 24 horas de antelacion.
            </span>
          </div>
          <div className="flex flex-row justify-evenly w-full lg:hidden">
            <PrimaryButton text="CANCELAR" onClick={handleCancel} alternative={true} />
            <PrimaryButton text="RESERVAR" onClick={handleConfirm} />
          </div>
        </div>

        <div className="hidden lg:flex gap-5 flex-col justify-center">
          <div
            className="w-[600px] h-[400px] mt-16 bg-no-repeat bg-cover rounded-lg"
            style={{ backgroundImage: `url(${data.images[0]})` }}
          ></div>
          <div className="flex flex-row justify-evenly w-full ">
            <PrimaryButton text="CANCELAR" onClick={handleCancel} alternative={true} />
            <PrimaryButton text="RESERVAR" onClick={handleConfirm} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SFDetail;
