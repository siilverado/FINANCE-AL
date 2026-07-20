import { type FC, useState } from 'react';
import { Link } from 'react-router-dom';

import { FaBasketballBall } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GoKebabVertical } from 'react-icons/go';
import { MdKeyboardArrowLeft } from 'react-icons/md';

import SportMenu from '../SportMenu';
import { useSelector } from 'react-redux';
import { AppUser } from '../../types/App.type';

const NavMobile: FC<{ title: string }> = ({ title }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSecondMenu, setOpenSecondMenu] = useState(false);
  const [openSportMenu, setOpenSportMenu] = useState(false);

  const userInfo = useSelector((state: AppUser) => state.user.user);

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
  const handleCloseSecondMenu = () => {
    setOpenSecondMenu(false);
    localStorage.removeItem('token');
  };
  const handleCloseSportMenu = () => setOpenSportMenu(false);

  return (
    <nav className="sticky z-10 px-5 bg-primary flex justify-center shadow-lg w-full h-[12vh] lg:hidden">
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
        <SportMenu handleClick={handleCloseSportMenu} state={openSportMenu} />
        <div className="text-white text-2xl">
          <div onClick={handleClickSecondMenu}>
            <GoKebabVertical />
          </div>
          <div
            className={`${
              openSecondMenu ? 'flex' : 'hidden'
            }   items-center absolute -left-40 top-10 h-40 w-52 bg-black py-10 rounded-md`}
          >
            <Link
              to={'/'}
              onClick={handleCloseSecondMenu}
              className="pl-5 py-5 active:bg-primary w-full"
            >
              Cerrar sesion
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${
          openMenu ? 'tranlate-x-0' : 'translate-x-[-100%]'
        } z-[500] transition-transform fixed left-0 w-5/6 h-full bg-black text-white pt-10`}
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
          <div
            className="w-36 h-36 rounded-full bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${userInfo?.image})` }}
          ></div>
          <ul className="flex flex-col items-center gap-10 text-xl">
            <li>
              <Link to={'/inicio'}>INICIO</Link>
            </li>
            <li>
              <Link to={'/perfil'}>PERFIL</Link>
            </li>
            <li>
              <Link to={'/perfil/reservar'}>MIS RESERVAS</Link>
            </li>
            <li>
              <Link to={'/ayuda'}>AYUDA</Link>
            </li>
            <li>
              {' '}
              <Link to={'/nosotros'}>NOSOTROS</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavMobile;
