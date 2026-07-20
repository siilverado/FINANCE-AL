import { useState, type FC, useEffect } from 'react';

import Layout from '../Components/Layout';
import SportField from '../Components/SportField';
import { getSportFieldsWithSport } from '../Functions/SportFieldsQuery';

const SportFields: FC = () => {
  // const Data = ['1', '1', '1', '1', '1', '1', '1'];
  const [Data, setData] = useState([]);
  useEffect(() => {
    getSportFieldsWithSport(setData, 'basketball')
  }, []);

  return (
    <Layout title="Canchas">
      <div className="flex flex-row w-full justify-center gap-20 overflow-hidden max-h-[90vh]">
        <div className="scrollbarSF flex flex-col gap-5 my-5 w-full max-w-[450px] overflow-y-scroll lg:mt-10 lg:max-h-[525px] px-5">
          {Data?.map((item, index) => (
            <SportField
              key={index}
              complexData={true}
              btnText={'RESERVAR'}
              route="/reservas/:sport/canchas/id"
            />
          ))}
        </div>
        <div className="hidden rounded-lg lg:block w-[700px] h-[475px] bg-primary mt-20"></div>
      </div>
    </Layout>
  );
};

export default SportFields;
