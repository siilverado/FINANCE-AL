import { FC, useState } from 'react';

import { Link } from 'react-router-dom';

import { FaBasketballBall } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GoKebabVertical } from 'react-icons/go';
import { MdKeyboardArrowLeft } from 'react-icons/md';

const NavMobile: FC<{ title: string }> = ({ title }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSecondMenu, setOpenSecondMenu] = useState(false);
  const [openSportMenu, setOpenSportMenu] = useState(false);

  const handleClickMenu = () => {
    setOpenMenu(!openMenu);
    setOpenSecondMenu(false);
    setOpenSportMenu(false);
  };
  const handleClickSecondMenu = () => {
    setOpenSecondMenu(!openSecondMenu);
    setOpenMenu(false);
    setOpenSportMenu(false);
  };
  const handleClickSportsMenu = () => {
    setOpenSportMenu(!openSportMenu);
    setOpenMenu(false);
    setOpenSecondMenu(false);
  };
  const handleCloseSecondMenu = () => setOpenSecondMenu(false);
  const handleCloseSportMenu = () => setOpenSportMenu(false);

  return (
    <nav className="z-[500] px-5 bg-primary flex justify-center shadow-lg fixed w-full h-[80px] lg:hidden">
      <div className=" gap-7 justify-start flex w-full items-center pb-5 pt-10">
        <button className="text-white text-2xl" onClick={handleClickMenu}>
          <GiHamburgerMenu />
        </button>
        <h1 className="text-white text-xl w-full pr-1 text-left font-light">{title}</h1>
      </div>
      <div className="relative gap-7 justify-end flex items-center pb-5 pt-10 ">
        <button
          className={`${
            openSportMenu ? 'rotate-90' : '-rotate-90'
          } text-white align-middle text-2xl transition-transform`}
          onClick={handleClickSportsMenu}
        >
          <MdKeyboardArrowLeft />
        </button>
        <ul
          className={`${
            openSportMenu ? 'flex' : 'hidden'
          } text-white text-2xl flex-col justify-around absolute -left-56 top-10 w-52 bg-[#000] py-10 rounded-md`}
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
        <div className="text-white text-2xl">
          <div onClick={handleClickSecondMenu}>
            <GoKebabVertical />
          </div>
          <ul
            className={`${
              openSecondMenu ? 'flex' : 'hidden'
            }   items-center absolute -left-40 top-10 h-40 w-52 bg-[#000] py-10 rounded-md`}
          >
            <li onClick={handleCloseSecondMenu} className="pl-5 py-5 active:bg-primary w-full">
              Cerrar sesion
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`${
          openMenu ? 'tranlate-x-0' : 'translate-x-[-100%]'
        } transition-transform absolute left-0 w-5/6 h-screen bg-[#000] text-white pt-10`}
      >
        <div className="flex flex-row w-full justify-between px-5">
          <Link to={'/inicio'} className="text-2xl">
            <FaBasketballBall />
          </Link>
          <div className="text-2xl" onClick={handleClickMenu}>
            <MdKeyboardArrowLeft />
          </div>
        </div>
        <div className="flex flex-col w-full items-center gap-16 mt-10">
          <div className="w-36 h-36 bg-white rounded-full"></div>
          <ul className="flex flex-col items-center gap-10 text-2xl">
            <li>
              <Link to={'/perfil'}>Perfil</Link>
            </li>
            <li>
              <Link to={'/perfil/reservas'}>Mis reservas</Link>
            </li>
            <li>
              {' '}
              <Link to={'/propietarios/canchas'}>Mis canchas</Link>
            </li>
            <li>
              {' '}
              <Link to={'/nosotros'}>Nosotros</Link>
            </li>
            <li>
              <Link to={'/ayuda'}>Ayuda</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavMobile;
