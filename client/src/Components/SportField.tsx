import { FC, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { MdKeyboardArrowLeft } from 'react-icons/md';

import PrimaryButton from '../Components/PrimaryButton';

interface sportFieldType {
  complexData: boolean;
  btnText: string;
  route: string;
}

const SportField: FC<sportFieldType> = ({ complexData, btnText, route }) => {
  const [moreInfo, setMoreInfo] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => setMoreInfo(!moreInfo);

  return (
    <div className="mb-5 shadow-lg">
      <div className="bg-cover bg-[url('https://web-assets.playfinder.com/wp-content/uploads/2017/12/27164405/Bookteq-CRM-email-clay-hard-tennis-600x260.jpg')] w-full h-52 rounded-t-lg"></div>
      <div className="flex flex-col gap-5 p-5 bg-white rounded-b-lg">
        <div>
          <span className="block text-3xl ">Titulo</span>
          {complexData && (
            <span className="block opacity-70 relative bottom-2 text-lg">Ubicacion</span>
          )}
        </div>
        <div
          className={`${
            complexData ? 'items-center' : 'gap-5 flex-row-reverse'
          } flex w-full justify-left flex-wrap`}
        >
          {complexData ? (
            <span className="w-1/2">Estrellas</span>
          ) : (
            <PrimaryButton text="ADMINISTRAR" onClick={() => navigate('/propietarios/turnos')} />
          )}
          <PrimaryButton
            text={btnText}
            onClick={() => navigate(route)}
            alternative={!complexData}
          />
        </div>
        {complexData && (
          <>
            <span
              className="text-lg flex items-center justify-between w-[125px]"
              onClick={handleClick}
            >
              {moreInfo ? 'Ver menos' : 'Ver más'}
              <span className={`${moreInfo ? 'rotate-90' : '-rotate-90'} transition-all`}>
                <MdKeyboardArrowLeft />
              </span>
            </span>
            <ul
              className={`${moreInfo ? 'h-[125px]' : 'h-0'} transition-all text-lg overflow-hidden`}
            >
              <li>Estacionamiento</li>
              <li>Asador</li>
              <li>Vestuario</li>
              <li>Resto-Bar</li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default SportField;
