import { useState, useEffect } from 'react';

import Layout from '../Components/Layout';
import SportCard from '../Components/SportCard';
import { getAllSports } from '../Functions/SportQuery';

interface SportItem {
  id: string;
  name: string;
  images: string[];
}


const Reservation = () => {
  const [sports, setSports] = useState<SportItem[] | []>([]);

  useEffect(() => {
    getAllSports(setSports)
  }, []);

  return (
    <Layout title="Deportes">
      <div className="w-full h-full overflow-scroll fixed bg-cover bg-[45%]">
        <div className="flex flex-col gap-16 mx-1 h-full pt-24 relative lg:flex-row lg:mx-20 lg:pt-0 lg:items-center lg:bottom-20 lg:justify-between">
  
          {sports.length ? (
            sports.map((sport) => {
              return (
                <SportCard
                  key={sport.id}
                  href={`/reservas/${sport.name}`}
                  bgImage={sport.images[0]}
                  title={sport.name}
                />
              );
            })
          ) : (
            <h2 className="text-2xl text-center">ERROR - DEPORTES EN MANTENIMIENTO</h2>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Reservation;
