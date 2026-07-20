import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';

import PrimaryButton from './PrimaryButton';

interface props {
  title: string;
  route: string;
}

const Card: FC<props> = ({ title, route }) => {
  const navigate = useNavigate();

  const handleClick = () => navigate(`${route}`);
  return (
    <div className="w-full lg:max-w-[700px]">
      <div className="relative rounded-t-lg bg-primary bg-opacity-80 w-full h-[150px] lg:h-64">
        <h2 className=" absolute bottom-4 left-10 text-white text-xl w-10/12 text-left font-semibold lg:text-3xl">
          {title}
        </h2>
      </div>
      <div className=" relative rounded-b-lg w-full h-[48px] shadow-lg bottom-0 bg-white">
        <div className="absolute bottom-5 right-10">
          <PrimaryButton text="IR" onClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default Card;
