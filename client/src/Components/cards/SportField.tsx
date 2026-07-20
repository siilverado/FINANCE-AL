import { type FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MdKeyboardArrowLeft } from 'react-icons/md';

import { type sportData } from '../../types/Sport.type';
import PrimaryButton from '../PrimaryButton';

interface sportFieldType {
  complexData: boolean;
  btnText: string;
  route: string;
  item: sportData;
}

const SportField: FC<sportFieldType> = ({ complexData, btnText, route, item }) => {
  const [moreInfo, setMoreInfo] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => setMoreInfo(!moreInfo);

  const { grill, showers, bathrooms, restobar, parking, locker } = item.sportsComplex;

  return (
    <div className="mb-5">
      <div
        style={{ backgroundImage: `url(${item?.images[0]})` }}
        className="bg-cover bg-center w-full h-52 rounded-t-lg"
      ></div>
      <div className="flex flex-col gap-16 p-5  bg-white rounded-b-lg shadow-lg">
        <div>
          <span className="block text-3xl ">{item?.name}</span>
          {complexData && (
            <span className="block opacity-70 relative bottom-2 text-lg">
              {item?.sportsComplex?.ubication}
            </span>
          )}
        </div>
        <div
          className={`${
            complexData ? 'items-center' : 'gap-5 flex-row-reverse'
          } flex w-full justify-between flex-wrap`}
        >
          {complexData ? (
            <span className="w-1/2 flex-grow">{item?.sportsComplex?.address}</span>
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
            <div className="text-lg flex items-center justify-between w-[125px]">
              <span onClick={handleClick} className="cursor-pointer">
                {moreInfo ? 'Ver menos' : 'Ver más'}
              </span>
              <span
                onClick={handleClick}
                className={`${moreInfo ? 'rotate-90' : '-rotate-90'} transition-all cursor-pointer`}
              >
                <MdKeyboardArrowLeft />
              </span>
            </div>
            <ul
              className={`${moreInfo ? 'h-[240px]' : 'h-0'} transition-all text-lg overflow-hidden`}
            >
              <li className="flex flex-row justify-between w-6/12 my-3">
                <span>Estacionamiento</span>
                <input type="checkbox" checked={parking} disabled />
              </li>
              <li className="flex flex-row justify-between w-6/12 my-3">
                <span>Parrilla</span>
                <input type="checkbox" checked={grill} disabled />
              </li>
              <li className="flex flex-row justify-between w-6/12 my-3">
                <span>Casillero</span>
                <input type="checkbox" checked={locker} disabled />
              </li>
              <li className="flex flex-row justify-between w-6/12 my-3">
                <span>Baños</span>
                <input type="checkbox" checked={bathrooms} disabled />
              </li>
              <li className="flex flex-row justify-between w-6/12 my-3">
                <span>Duchas</span>
                <input type="checkbox" checked={showers} disabled />
              </li>
              <li className="flex flex-row justify-between w-6/12 my-3">
                {' '}
                <span>Resto Bar</span>
                <input
                  type="checkbox"
                  checked={restobar}
                  disabled
                  className="disabled:accent-primary"
                />
              </li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default SportField;
