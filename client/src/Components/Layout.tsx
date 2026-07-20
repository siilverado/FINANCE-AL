import { type FC, type PropsWithChildren } from 'react';
import NavDesktop from './NavDesktop';
import NavMobile from './NavMobile';
interface props {
  title: string;
}

const Layout: FC<PropsWithChildren<props>> = ({ children, title }) => {
  return (
    <>
      <header>
        <NavDesktop />
        <NavMobile title={title} />
      </header>
      <div className="z-10 pt-[80px] bg-bg min-h-screen">{children}</div>
    </>
  );
};

export default Layout;
