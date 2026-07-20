import { useState, useEffect } from 'react';

import SportCard from '../../Components/cards/SportCard';
import Layout from '../../Components/layout/Layout';
import { getAllSports } from '../../Functions/SportQuery';

interface SportItem {
  id: string;
  name: string;
  images: string[];
}

const Reservation = () => {
  const [sports, setSports] = useState<SportItem[] | []>([]);

  useEffect(() => {
    getAllSports()
      .then((data) => data && setSports(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Layout title='Deportes'>
      <div className='w-full h-full overflow-scroll bg-cover bg-[45%] py-5'>
        <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 lg:px-10 lg:py-5'>
          {sports.length ? (
            sports.map((sport) => {
              return (
                <SportCard
                  key={sport.id}
                  href={`/reservar/${sport.name}`}
                  bgImage={sport.images[0]}
                  title={sport.name}
                />
              );
            })
          ) : (
            <h2 className='text-2xl text-center flex w-screen mt-20 justify-center items-center'>
              ERROR - DEPORTES EN MANTENIMIENTO
            </h2>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Reservation;
