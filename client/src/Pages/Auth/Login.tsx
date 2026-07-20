import { type BaseSyntheticEvent, type FC, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { FaBasketballBall } from 'react-icons/fa';
import Swal from 'sweetalert2';

import { loginUser } from '../../Functions/UserQuery';

const Login: FC = () => {
  const [email, setMail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();

    loginUser({ email, password })
      .then((query) => {
        if (query?.data.user) {
          toast.success(`Bienvenido ${query.data.user.firstName}!`, {
            style: {
              background: '#F5F5F5',
              color: '#4CAF50',
            },
          });
          return setTimeout(() => navigate('/inicio'), 2000);
        }
        Swal.fire({
          title: 'Error!',
          text: 'Email o Contraseña no validos',
          footer: `<b>Tip:</b>Recuerde activar o desactivar las mayusculas.`,
          icon: 'error',
          confirmButtonText: 'Registrarse',
          confirmButtonColor: '#4CAF50',
          showCancelButton: true,
          cancelButtonText: 'Intentar otra vez',
        })
          .then((result) => {
            if (result.isConfirmed) return navigate('/registro');
            setMail('');
            setPassword('');
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
        <div className="lg:w-1/3 w-full flex text-lg flex-col items-center h-[80px]">
          <input
            className="py-3 px-5 rounded-2xl focus:outline-none w-10/12"
            type="mail"
            placeholder="Mail"
            value={email}
            onChange={(event) => {
              setMail(event.target.value);
            }}
          />
        </div>
        <div className="lg:w-1/3  w-full flex text-lg flex-col items-center h-[50px]">
          <input
            className="py-3 px-5 rounded-2xl focus:outline-none w-10/12"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <input
          className="mt-5 cursor-pointer font-semibold w-28 py-3 text-lg rounded-full bg-[#CAE0DB]"
          type="submit"
          value="INICIAR"
        />
      </form>
    </div>
  );
};

export default Login;
