import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { FaBasketballBall } from 'react-icons/fa';

import { authUser } from '../../Functions/UserQuery';

// TODO: Move this to a constants file
const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL;

const MainPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      if (token) {
        localStorage.setItem('token', token);
        authUser()
          .then(() => {
            // Obtener la URL actual
            let url = window.location.href;

            // Buscar el parámetro "token" y su valor
            const regex = /[?&]token=([^&#]*)/;
            const match = regex.exec(url);

            // Si se encontró el parámetro "token"
            if (match != null) {
              // Eliminar el parámetro y su valor de la URL
              url = url.replace(match[0], '');

              // Reemplazar la URL actual sin el parámetro "token"
              window.history.replaceState(null, '', url);
            }
          })
          .then(() => navigate('/inicio'))
          .catch((e) => console.log('Auth failed', e));
      }
    }, 50);
  }, [navigate]);

  return (
    <div className="bg-bg relative min-h-screen min-w-screen overflow-hidden flex flex-col justify-center items-center gap-10">
      <span className="absolute  -top-16 -left-16 lg:-top-[120px] lg:-left-[120px] w-64 bg-primary h-64 lg:w-[500px] lg:h-[500px] rounded-full"></span>
      <span className="absolute -bottom-16 -right-16 lg:-bottom-[120px] lg:-right-[120px] w-64 bg-primary h-64 lg:w-[500px] lg:h-[500px]  rounded-full"></span>
      <div>
        <FaBasketballBall className="lg:w-[272px] lg:h-[248px]   w-[128px] h-[128px] text-primary"></FaBasketballBall>
      </div>
      <div className="flex flex-col w-full items-center gap-5">
        <Link
          className="w-10/12 lg:w-1/5 py-3 rounded-full text-center font-bold bg-gradient-to-tr from-gradone to-gradtwo"
          to="/ingresar"
        >
          INICIAR SESION
        </Link>
        <Link
          className="w-10/12 lg:w-1/5 py-3 rounded-full text-center font-bold bg-gradone"
          to={'/registro'}
        >
          REGISTRARSE
        </Link>
        <div
          onClick={() => {
            window.location.href = `${BACKEND_URL}/auth/google`;
          }}
          className="bg-white px-20 py-2 rounded-full"
        >
          Google
        </div>
      </div>
    </div>
  );
};

export default MainPage;
