import { type BaseSyntheticEvent, type FC, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { AiFillEye } from 'react-icons/ai';
import { HiOutlineUser, HiUser } from 'react-icons/hi';
import { IoMdMail } from 'react-icons/io';
import Swal from 'sweetalert2';

import Input from '../../Components/inputs/Input';
import { registerUser } from '../../Functions/UserQuery';
import { modifyObj } from '../../utils/modifyObj';
import { type inputData, type objectProp, validationInputs } from '../../utils/validationInputs';

interface stateType {
  [key: string]: inputData;
  email: inputData;
  firstName: inputData;
  lastName: inputData;
  password: inputData;
  confirmPass: inputData;
}

const Register: FC = () => {
  const defaultState: stateType = {
    email: { value: '', validation: true },
    firstName: { value: '', validation: true },
    lastName: { value: '', validation: true },
    password: { value: '', validation: true },
    confirmPass: { value: '', validation: true },
  };
  const [state, setState] = useState<stateType | objectProp>(defaultState);

  const navigate = useNavigate();

  const handleChange = (event: BaseSyntheticEvent) => {
    setState((prev) => {
      const target = event.target;
      return {
        ...prev,
        [target.name]: { value: target.value, validation: true },
      };
    });
  };

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();

    const { newState, pass } = validationInputs({ ...state }, 3);
    setState(newState);
    if (!pass) return;

    const { confirmPass, ...user } = state;
    const newObj = modifyObj({ ...user });

    if (state.password.value === confirmPass.value) {
      registerUser(newObj)
        .then((query) => {
          if (query?.data.user) {
            toast.success(`Bienvenido ${query.data.user.firstName}! a AllSport`, {
              style: {
                background: '#F5F5F5',
                color: '#4CAF50',
              },
            });
            return setTimeout(() => navigate('/inicio'), 2000);
          }
          Swal.fire({
            title: 'Error!',
            text: 'Faltan completar algunos campos. Si ya tiene cuenta aprete en "Ingresar".',
            footer: `<b>Tip:</b> &nbsp Recuerde todos los campos son obligatorios.`,
            icon: 'error',
            confirmButtonText: 'Ingresar',
            confirmButtonColor: '#4CAF50',
            showCancelButton: true,
            cancelButtonText: 'Intentar otra vez',
          })
            .then((result) => {
              if (result.isConfirmed) return navigate('/ingresar');
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'No se ha podido registrar.',
        footer: `<b>Tip:</b> &nbsp Recuerde todos los campos son obligatorios, la contraseña tiene que tener mayusculas y numeros, el email debe ser uno valido.`,
        icon: 'error',
        showConfirmButton: false,
        cancelButtonText: 'Intentar otra vez',
        showCancelButton: true,
        cancelButtonColor: '#4CAF50',
      }).catch((err) => console.log(err));
      console.log('ERROR: Las contraseñas deben ser iguales');
    }
  };

  return (
    <>
      <header className="bg-primary">
        <h1 className="text- text-2xl pt-10 pb-5 pl-10 lg:text-4xl lg:pl-20 lg:py-10">
          Registrarse
        </h1>
      </header>
      <div className="z-10 pt-5 bg-bg min-h-[90vh]">
        <div className=" w-full m-auto lg:w-2/5 flex flex-col ">
          <form onSubmit={handleSubmit} className="flex flex-col w-full  items-center">
            <div className="flex flex-col w-full items-center gap-5 lg:gap-7 py-12">
              <Input
                type="mail"
                label="Mail"
                icon={<IoMdMail />}
                handleChange={handleChange}
                name="email"
                value={state.email.value}
                validation={state.email.validation}
              />
              <Input
                type="text"
                label="Nombre"
                handleChange={handleChange}
                name="firstName"
                value={state.firstName.value}
                icon={<HiOutlineUser />}
                validation={state.firstName.validation}
              />
              <Input
                type="text"
                label="Apellido"
                icon={<HiUser />}
                name="lastName"
                value={state.lastName.value}
                handleChange={handleChange}
                validation={state.lastName.validation}
              />
              <Input
                type="password"
                label="Contraseña"
                handleChange={handleChange}
                name={'password'}
                value={state.password.value}
                icon={<AiFillEye />}
                validation={state.password.validation}
              />
              <Input
                type="password"
                label="Confirmar contraseña"
                handleChange={handleChange}
                value={state.confirmPass.value}
                name={'confirmPass'}
                icon={<AiFillEye />}
                validation={state.confirmPass.validation}
              />
            </div>
            <button className="cursor-pointer mt-5 w-10/12 lg:w-2/3 py-2 rounded-full font-bold bg-gradient-to-tr from-gradone to-gradtwo">
              REGISTRARSE
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
