import { type BaseSyntheticEvent, type FC, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';
import { BsCalendar2Event } from 'react-icons/bs';
import { GiSoccerField } from 'react-icons/gi';
import { MdLocationOn } from 'react-icons/md';
import { TfiTime } from 'react-icons/tfi';

import InputLocation from '../../Components/inputs/InputLocation';
import Select from '../../Components/inputs/Select';
import SelectCalendar from '../../Components/inputs/SelectCalendar';
import SelectHour from '../../Components/inputs/SelectHour';
import Layout from '../../Components/layout/Layout';
import PrimaryButton from '../../Components/PrimaryButton';
import { getSportFieldsWithSport } from '../../Functions/SportFieldsQuery';
import { type appSport } from '../../types/App.type';
import { type inputData, validationInputs } from '../../utils/validationInputs';

const API_KEY = 'AIzaSyB8rVxLxXlomXkjJ04LRtFHC63AtzSnyw0';

export const Search: FC = () => {
  const navigate = useNavigate();
  const { sport = '' } = useParams();
  const sportInfo = useSelector((state: appSport) => state.sport.sport);

  const sportData = sportInfo?.find((item) => item.name === sport);

  const sportNames = sportInfo?.map((item) => item.name);
  const sportFields = sportInfo?.find((item) => item.name === sport);

  const defaultState = { value: '', validation: true, select: true };
  const [location, setLocation] = useState<inputData>(defaultState);
  const [field, setField] = useState<inputData>(defaultState);
  const [turn, setTurn] = useState<inputData>(defaultState);
  const [time, setTime] = useState<inputData>(defaultState);

  const [loader, setLoader] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const modifyState = (option: string) => ({ value: option, validation: true, select: true });
  const handleTurn = (option: string) => setTurn(modifyState(option));
  const handleField = (option: string) => setField(modifyState(option));
  const handleTime = (option: string) => setTime(modifyState(option));
  const handleLocationName = (option: string) => setLocation(modifyState(option));

  const handleSearch = async () => {
    if (location) {
      try {
        const { data } = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${location.value}&key=${API_KEY}`,
        );
        if (!data.results[0]) {
          toast.error('Por favor complete la ubicacion con mas informacion');
        }
        const { lat, lng }: { lat: number; lng: number } = data.results[0].geometry?.location;

        return { lat, lng };
      } catch (error) {
        console.log(error);
      }
    }
    toast.error('La ubicacion no existe o no esta definida.');
  };

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    const { newState, pass } = validationInputs({ location, field, turn, time }, 3);

    setLocation(newState.location);
    setField(newState.field);
    setTurn(newState.turn);
    setTime(newState.time);
    setIsSubmitted(true);
    if (!pass) return;

    handleSearch()
      .then(async (data) => {
        if (data && data.lat && data.lng) {
          const fetchPromise = await getSportFieldsWithSport({
            lat: Number(data.lat),
            lng: Number(data.lng),
            rHour: Number(time.value),
            date: turn.value,
            sport,
            fieldType: field.value,
          });
          const toastId = toast.loading('Buscando...', {
            style: {
              background: '#F5F5F5',
              color: '#4CAF50',
            },
          });
          if (fetchPromise !== undefined && fetchPromise?.length > 0) {
            return setTimeout(() => {
              toast.dismiss(toastId);
              navigate(
                `/reservar/${sport}/canchas?lat=${data.lat}&lng=${data.lng}&rHour=${time.value}&date=${turn.value}&fieldType=${field.value}`,
              );
            }, 2000);
          }

          toast.dismiss(toastId);
          toast.error('No se encontraron canchas.');
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (sport && sportNames && sportNames.includes(sport)) {
      setLoader(true);
    } else if (sport && sportNames) {
      navigate('/reservar');
    }
  }, [navigate, sport, sportNames, isSubmitted]);

  const bg = `url('${sportData?.image}')`;

  return (
    <Layout title={`${loader ? sport : ''}`}>
      <div
        className={`absolute w-full h-full bg-cover bg-no-repeat ${
          sport === 'tennis' && 'bg-bottom'
        }`}
        style={{ backgroundImage: bg }}
      />
      <div className="w-full flex justify-center items-center pt-10 pb-2">
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col items-center lg:mx-[30%]  backdrop-blur-sm bg-lightWhite rounded-lg h-fit relative"
        >
          <div className="flex flex-col gap-10 w-full items-center mt-10 ">
            <InputLocation
              label="Ubicacion"
              icon={<MdLocationOn />}
              handleLocationName={handleLocationName}
              value={location.value}
              validation={location.validation}
            />
            {sportFields?.types && (
              <Select
                array={sportFields?.types}
                label="Tipo de Cancha"
                value={field.value}
                handleClick={handleField}
                icon={<GiSoccerField />}
                validation={field.validation}
              />
            )}
            <SelectCalendar
              label="Dia"
              value={turn.value}
              handleClick={handleTurn}
              icon={<BsCalendar2Event />}
              validation={turn.validation}
            />
            <SelectHour
              label="Horario"
              value={time.value}
              handleClick={handleTime}
              icon={<TfiTime />}
              validation={time.validation}
            />
          </div>
          {/* <div className="">  "lg:absolute lg:bottom-10 lg:right-10" */}
          <div className="flex justify-end w-[88%] my-5">
            <PrimaryButton text="BUSCAR" />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Search;
