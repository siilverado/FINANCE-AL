import { CSSProperties, type FC, type PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import NavDesktop from './NavDesktop';
import NavMobile from './NavMobile';
interface props {
  title: string;
  bg?: string;
  style?: CSSProperties;
}

const Layout: FC<PropsWithChildren<props>> = ({ children, title, bg, style }) => {
  return (
    <>
      {localStorage.getItem('token') ? (
        <>
          <header>
            <NavDesktop />
            <NavMobile title={title} />
          </header>
          <div
            className={`relative bg-bg min-h-[88vh] lg:min-h-[85vh] ${bg ?? ''}`}
            style={style}
          >
            <div>{children}</div>
          </div>
        </>
      ) : (
        <Navigate to={'/'} />
      )}
    </>
  );
};

export default Layout;
