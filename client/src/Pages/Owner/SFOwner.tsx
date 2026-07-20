import { useEffect, type FC, useState } from 'react';

import SportField from '../../Components/cards/SportField';
import Layout from '../../Components/layout/Layout';
import { getOwnerSportFields } from '../../Functions/SportFieldsQuery';
import { type sportData } from '../../types/Sport.type';

const SFOwner: FC = () => {
  const [sportFields, setSportFields] = useState<sportData[]>([]);

  useEffect(() => {
    getOwnerSportFields()
      .then((data) => data && setSportFields(data))
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <Layout title='Mis canchas'>
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 px-1 py-20 lg:px-10 lg:h-full'>
        {sportFields.map((sportField) => (
          <SportField
            key={sportField.id}
            complexData={false}
            btnText={'EDITAR'}
            route={`/propietarios/canchas/${sportField.id}`}
            item={sportField}
          />
        ))}
      </div>
    </Layout>
  );
};

export default SFOwner;
