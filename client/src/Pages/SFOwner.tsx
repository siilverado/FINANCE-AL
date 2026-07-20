import { type FC } from 'react';

import Layout from '../Components/Layout';
import SportField from '../Components/SportField';

const SFOwner: FC = () => {
  const Data = ['1', '1', '1', '1', '1', '1', '1'];

  return (
    <Layout title="Mis canchas">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-1 py-20 lg:px-10">
        {Data.map((item, index) => (
          <SportField
            key={index}
            complexData={false}
            btnText={'EDITAR'}
            route="/propietarios/canchas/id"
          />
        ))}
      </div>
    </Layout>
  );
};

export default SFOwner;
