import { type FC } from 'react';
import { useSelector } from 'react-redux';

import { type AppComplex } from '../types/App.type';

import Card from './cards/Card';
import OwnerCard from './cards/OwnerCard';

export const OwnerMenu: FC = () => {
  const hasComplex = useSelector((state: AppComplex) => state.complex?.hasComplex);

  return (
    <div className='w-full h-fit'>
      <div className='w-full px-3 py-5 lg:absolute :lgtop-[15%] lg:top-1/4'>
        <div className='flex flex-col w-full h-full gap-10 lg:flex-row lg:justify-center'>
          <OwnerCard exists={hasComplex} />
          {hasComplex && (
            <>
              <Card route='/propietarios/canchas' title='Mis canchas' />
              <Card route='/propietarios/agregar-cancha' title='Agregar cancha' />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
