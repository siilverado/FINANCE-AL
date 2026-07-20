import { type BaseSyntheticEvent, type FC, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { FaBasketballBall } from 'react-icons/fa';
import Swal from 'sweetalert2';

import { loginUser } from '../../Functions/UserQuery';
import { type inputData, type objectProp, validationInputs } from '../../utils/validationInputs';

interface stateType {
  [key: string]: inputData;
  email: inputData;
  password: inputData;
}

const Login: FC = () => {
  const defaultState: stateType = {
    email: { value: '', validation: false },
    password: { value: '', validation: false },
  };

  const [state, setState] = useState<stateType | objectProp>(defaultState);
  const navigate = useNavigate();

  const [verifyInputs, setVerifyInputs] = useState<boolean>(false);

  const handleChange = (e: BaseSyntheticEvent) => {
    const target = e.target;
    setState((prev) => {
      return {
        ...prev,
        [target.name]: { value: target.value, validation: false },
      };
    });
  };

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();

    const { newState, pass } = validationInputs(state, 3);
    setState(newState);
    setVerifyInputs(true);
    if (!pass) return;

    loginUser({ email: state.email.value, password: state.password.value })
      .then((query) => {
        if (query?.data.user) {
          toast.success(`Bienvenido ${query.data.user.firstName}!`, {
            style: {
              background: '#F5F5F5',
              color: '#4CAF50',
            },
          });
          return setTimeout(() => navigate('/inicio'), 1500);
        }
        Swal.fire({
          title: 'Error!',
          text: 'Email o Contraseña no validos',
          footer: `<b>Tip:</b> &nbsp Recuerde activar o desactivar las mayusculas.`,
          icon: 'error',
          confirmButtonText: 'Registrarse',
          confirmButtonColor: '#4CAF50',
          showCancelButton: true,
          cancelButtonText: 'Intentar otra vez',
        })
          .then((result) => {
            if (result.isConfirmed) return navigate('/registro');
            setState(defaultState);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="relative h-screen w-screen flex flex-col justify-center items-center gap-10 bg-primary">
      <div>
        <FaBasketballBall className="lg:w-[272px] lg:h-[248px]   w-[128px] h-[128px] text-gradone" />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col w-full items-center gap-5">
        <div className="lg:w-1/3 w-full flex text-lg flex-col items-center">
          <input
            className="py-3 px-5 rounded-2xl focus:outline-none w-10/12"
            type="mail"
            placeholder="Mail"
            value={state.email.value}
            onChange={handleChange}
            name="email"
          />
          {verifyInputs && !state.email.validation && (
            <span className="order-3 text-red w-10/12">
              Error: el Mail debe tener minimo 5 caracteres
            </span>
          )}
        </div>
        <div className="lg:w-1/3  w-full flex text-lg flex-col items-center h-[80px]">
          <input
            className="py-3 px-5 rounded-2xl focus:outline-none w-10/12"
            type="password"
            placeholder="Contraseña"
            value={state.password.value}
            onChange={handleChange}
            name="password"
          />
          {verifyInputs && !state.password.validation && (
            <span className="order-3 text-red w-10/12">
              Error: la contraseña debe tener al menos 5 caracteres
            </span>
          )}
        </div>
        <input
          className="cursor-pointer mt-5 font-semibold w-28 py-3 text-lg rounded-full bg-[#CAE0DB]"
          type="submit"
          value="INICIAR"
        />
      </form>
    </div>
  );
};

export default Login;
