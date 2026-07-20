import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { FaBasketballBall } from 'react-icons/fa';
import { GoKebabVertical } from 'react-icons/go';
import { MdKeyboardArrowLeft } from 'react-icons/md';

const NavDesktop: FC = () => {
  const [openSecondMenu, setOpenSecondMenu] = useState(false);
  const [openSportMenu, setOpenSportMenu] = useState(false);

  const handleClickSecondMenu = () => {
    setOpenSecondMenu(!openSecondMenu);
    setOpenSportMenu(false);
  };
  const handleClickSportsMenu = () => {
    setOpenSportMenu(!openSportMenu);
    setOpenSecondMenu(false);
  };
  const handleCloseSecondMenu = () => setOpenSecondMenu(false);
  const handleCloseSportMenu = () => setOpenSportMenu(false);

  return (
    <nav className="hidden z-[500] px-20 text-white bg-primary lg:flex flex-row shadow-lg fixed w-full h-28 justify-between items-center">
      <div className="flex gap-10 items-center">
        <div className="text-6xl">
          <Link to={'/inicio'}>
            <FaBasketballBall />
          </Link>
        </div>
        <div className="text-4xl">
          <Link to={'/inicio'}>ALL SPORT</Link>
        </div>
      </div>
      <ul className="flex flex-row gap-5 text-lg">
        <li>
          <Link className="p-5 rounded-full" to={'/inicio'}>
            HOME
          </Link>
        </li>
        <li>
          <Link className="p-5 rounded-full" to={'/ayuda'}>
            AYUDA
          </Link>
        </li>
        <li>
          <Link className="p-5 rounded-full" to={'/nosotros'}>
            NOSOTROS
          </Link>
        </li>
        <li className="relative">
          <button className="flex items-center gap-2" onClick={handleClickSportsMenu}>
            DEPORTES
            <span
              className={`${
                openSportMenu ? 'rotate-90' : '-rotate-90'
              } text-white align-middle text-2xl transition-transform`}
            >
              <MdKeyboardArrowLeft />
            </span>
          </button>
          <ul
            className={`${
              openSportMenu ? 'flex' : 'hidden'
            } text-white text-lg flex-col justify-around absolute -left-44 top-0 w-40 bg-[#000] py-5 rounded-md`}
          >
            <li className="pl-5 py-5 active:bg-primary">
              <Link onClick={handleCloseSportMenu} to={'/reservas/tenis'}>
                Tenis
              </Link>
            </li>
            <li className="pl-5 py-5 active:bg-primary">
              <Link onClick={handleCloseSportMenu} to={'/reservas/futbol'}>
                Futbol
              </Link>
            </li>
          </ul>
        </li>
      </ul>
      <div className="text-white absolute top-2 right-2">
        <div onClick={handleClickSecondMenu} className="text-2xl cursor-pointer">
          <GoKebabVertical />
        </div>
        <ul
          className={`${
            openSecondMenu ? 'flex' : 'hidden'
          }   items-center absolute text-lg -left-40 top-5 h-32 w-40 bg-[#000] py-10 rounded-md`}
        >
          <li onClick={handleCloseSecondMenu} className="pl-5 py-5 active:bg-primary w-full">
            Cerrar sesion
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavDesktop;
