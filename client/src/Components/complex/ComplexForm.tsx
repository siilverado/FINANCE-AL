import {
  useEffect,
  type FC,
  useState,
  type SetStateAction,
  type Dispatch,
  type BaseSyntheticEvent,
} from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { MdLocationOn, MdTitle } from 'react-icons/md';
import Swal from 'sweetalert2';

import { setComplex } from '../../App/complexSlice';
import store from '../../App/Store';
import {
  CreateComplexQuery,
  GetComplexQuery,
  UpdateComplexQuery,
} from '../../Functions/ComplexQuery';
import { getLatLng } from '../../Functions/MapQuery';
import { type AppComplex } from '../../types/App.type';
import type ComplexType from '../../types/Complex.type';
import { type HoursType } from '../../types/Hour.type';
import AvailabilityRange from '../AvailabilityRange';
import Input from '../inputs/Input';
import InputLocation from '../inputs/InputLocation';
import PrimaryButton from '../PrimaryButton';
import { Checkbox } from '../ui';
import { objectProp, validationInputs } from '../../utils/validationInputs';

const handleAmmeniesChangeFactory =
  (setState: Dispatch<SetStateAction<ComplexType>>, key: keyof ComplexType) => () => {
    setState((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

const onSubmit = (state: ComplexType, navTo: (param: string) => void) => {
  const { id, ...data } = state;
  if (id && data.email) {
    UpdateComplexQuery(data, id)
      .then((value) => {
        if (value?.id) {
          toast.success(`Complejo ${value.name}! se Actualizo en AllSport`, {
            style: {
              background: '#F5F5F5',
              color: '#4CAF50',
            },
          });
          return setTimeout(() => {
            value && store.dispatch(setComplex(value));
            navTo('/propietarios');
          }, 2000);
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Ocurrio un error al actualizar algunos campos',
            footer: `<b>Tip:</b>Recuerde todos los campos son obligatorios.`,
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonColor: '#4CAF50',
            cancelButtonText: 'Actualizar Campos',
          }).catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  } else {
    CreateComplexQuery(data)
      .then((value) => {
        if (value?.id) {
          toast.success(`Complejo ${value.name}! se Agrego a AllSport`, {
            style: {
              background: '#F5F5F5',
              color: '#4CAF50',
            },
          });
          return setTimeout(() => {
            value && store.dispatch(setComplex(value));
            navTo('/propietarios');
          }, 2000);
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Faltan completar algunos campos.',
            footer: `<b>Tip:</b>Recuerde todos los campos son obligatorios.`,
            icon: 'error',
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonColor: '#4CAF50',
            cancelButtonText: 'Completar Campos',
          }).catch((err) => console.log(err));
        }
      })
      .catch((err) => console.error(err));
  }
};

export const ComplexForm: FC = () => {
  const { hasComplex, complex: complexInfo } = useSelector((state: AppComplex) => state.complex);
  // const initialAddressRef = useRef("");
  // const [locationLoading, setLocationLoading] = useState(false);
  const navigate = useNavigate();

  const [state, setState] = useState<ComplexType>({
    id: '',
    name: '',
    address: '',
    email: '',
    phone: '',
    lat: 0,
    lng: 0,
    grills: false,
    locker: false,
    showers: false,
    restobar: false,
    parking: false,
    availability: [],
  });

  const [errors, setErrors] = useState<objectProp>({
    name: { value: '', validation: true },
    address: { value: '', validation: true },
    email: { value: '', validation: true },
    phone: { value: '', validation: true },
  });

  useEffect(() => {
    if (!hasComplex) {
      GetComplexQuery()
        .then((value) => {
          if (value) {
            // initialAddressRef.current = value.address;
            store.dispatch(setComplex(value));
          }
        })
        .catch((err) => console.log(err));

      return;
    }
    setState(complexInfo);
  }, [hasComplex]);

  const handleChange = (event: { target: { value: any; name: keyof ComplexType } }) => {
    setState((prev) => {
      const target = event.target;
      return {
        ...prev,
        [target.name]: target.value,
      };
    });
  };

  // const handleLocationChange = (address: string) => {
  //   setLocationLoading(true);
  // };

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();

    const { newState, pass } = validationInputs(
      {
        name: { value: state.name, validation: true },
        address: { value: state.address, validation: true },
        email: { value: state.email, validation: true },
        phone: { value: state.phone, validation: true },
      },
      3,
    );
    setErrors(newState);
    if (!pass) return;

    getLatLng(state.address)
      .then((res) => {
        if (res) {
          const { lat, lng } = res;
          onSubmit({ ...state, lat, lng }, navigate);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handleCancel = () => {
    setState({
      ...complexInfo,
    });
    return navigate('/propietarios');
  };
  const handleAvailabilityChange = (newAvailability: HoursType[]) => {
    setState({ ...state, availability: newAvailability });
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <div className="w-full mb-5 flex flex-col items-center gap-10 lg:flex-row lg:w-1/2 lg:justify-center lg:h-[500px]">
        <div className="w-full flex flex-col items-center gap-5 mt-10 lg:w-4/6">
          <Input
            validation={errors.name.validation}
            type="text"
            label="Nombre del complejo"
            value={state.name}
            name={'name'}
            handleChange={handleChange}
            icon={<MdTitle />}
          />
          <Input
            validation={errors.email.validation}
            type="text"
            label="Email"
            value={state.email}
            name={'email'}
            handleChange={handleChange}
          />
          <Input
            validation={errors.phone.validation}
            type="text"
            label="Telefono"
            value={state.phone}
            name={'phone'}
            handleChange={handleChange}
          />
          <InputLocation
            validation={errors.address.validation}
            label="Direccion"
            value={state.address}
            handleLocationName={(location) =>
              handleChange({ target: { name: 'address', value: location } })
            }
            icon={<MdLocationOn />}
          />
          <AvailabilityRange
            hours={state.availability}
            changeAvailability={handleAvailabilityChange}
          />
        </div>
        <div className="w-10/12 mt-5 flex flex-col gap-3 text-lg lg:w-2/6 lg:relative lg:top-8">
          <Checkbox
            name={'parking'}
            value={state.parking}
            handleChange={handleAmmeniesChangeFactory(setState, 'parking')}
          >
            Estacionamiento
          </Checkbox>
          <Checkbox
            name={'grills'}
            value={state.grills}
            handleChange={handleAmmeniesChangeFactory(setState, 'grills')}
          >
            Asador
          </Checkbox>
          <Checkbox
            name={'showers'}
            value={state.showers}
            handleChange={handleAmmeniesChangeFactory(setState, 'showers')}
          >
            Vestuario
          </Checkbox>
          <Checkbox
            name={'restobar'}
            value={state.restobar}
            handleChange={handleAmmeniesChangeFactory(setState, 'restobar')}
          >
            Resto-bar
          </Checkbox>
          <Checkbox
            name={'locker'}
            value={state.locker}
            handleChange={handleAmmeniesChangeFactory(setState, 'locker')}
          >
            Lockers
          </Checkbox>
        </div>
      </div>
      <div className="flex w-10/12 justify-between lg:relative lg:w-4/12 lg:m-10">
        <PrimaryButton type="button" text="CANCELAR" alternative={true} onClick={handleCancel} />
        <PrimaryButton text={hasComplex ? 'GUARDAR' : 'CREAR'} />
      </div>
    </form>
  );
};
