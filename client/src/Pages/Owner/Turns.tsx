import { type FC, useState, useEffect } from 'react';

import TurnsCard from '../../Components/cards/TurnsCard';
import Layout from '../../Components/layout/Layout';
import { GetTurns } from '../../Functions/TurnQuery';
import { type TurnType } from '../../types/Turn.type';

const ProfileReservation: FC = () => {
  const [turns, setTurns] = useState<TurnType[]>([]);

  useEffect(() => {
    GetTurns()
      .then((data) => data && setTurns(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Layout title="Mis reservas">
      <div className="flex w-full justify-center relative">
        {' '}
        <div className="bg-white rounded-lg shadow-lg mx-2 mt-20 max-h-[500px] min-h-[500px] flex flex-col gap-2 overflow-y-scroll w-[700px]">
          {turns.length ? (
            turns.map((item: TurnType) => <TurnsCard key={item.id} turn={item} />)
          ) : (
            <div className="h-full flex justify-center items-center flex-col gap-5">
              <span className="text-xl">No tienes ninguna reservacion aún</span>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProfileReservation;
