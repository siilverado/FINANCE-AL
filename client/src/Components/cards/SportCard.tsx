import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';

import PrimaryButton from '../PrimaryButton';

interface props {
  title: string;
  bgImage: string;
  href: string;
}

const SportCard: FC<props> = ({ title, bgImage, href }) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(href);

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.3)), url(${bgImage})`,
      }}
      // style={{ backgroundImage: `url(${bgImage})` }}
      className={`group m-1 m relative h-[220px] w-full lg:min-w-[600px] max-w-[600px] flex items-center rounded justify-center lg:h-[300px] bg-cover bg-center`}
    >
      <span className="absolute w-full h-full backdrop-blur-sm group-hover:backdrop-blur-0 transition-all"></span>
      <div className="font-segoeScript group-hover:opacity-0 transition-opacity bg-opacity-10 font-bold text-6xl text-center relative">
        {title}
      </div>
      <div className="absolute bottom-4 right-4">
        <PrimaryButton text="IR" onClick={handleClick}></PrimaryButton>
      </div>
    </div>
  );
};

export default SportCard;
