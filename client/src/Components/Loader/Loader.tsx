import { FaBasketballBall } from 'react-icons/fa';
import './loader.css';

const Loader = () => {
  return (
    <div className="bg-black absolute w-full h-full flex flex-col gap-20 justify-center items-center">
      <FaBasketballBall className="text-primary w-[110px] h-[110px]" />
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="dot-spinner">
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
          <div className="dot-spinner__dot"></div>
        </div>
        <div className="loader">
          <span>Cargando</span>
          <span>Cargando</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
