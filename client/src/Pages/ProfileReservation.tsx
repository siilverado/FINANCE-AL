import { type FC } from 'react';

import Layout from '../Components/Layout';
import ReservationCard from '../Components/ReservationCard';

const ProfileReservation: FC = () => {
  const Data = ['1', '1', '1', '1', '1', '1', '1'];

  return (
    <Layout title="Mis reservas">
      <div className="flex w-full justify-center">
        {' '}
        <div className="bg-white rounded-lg shadow-lg mx-2 mt-20 max-h-[500px] min-h-[500px] flex flex-col gap-2 overflow-y-scroll w-[700px]">
          {Data.map((item, index) => (
            <ReservationCard key={index} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProfileReservation;
