import { type FC } from 'react';

import Input from '../Components/Input';
import Layout from '../Components/Layout';
import PrimaryButton from '../Components/PrimaryButton';

const OwnerRegister: FC = () => {
  return (
    <Layout title="Propietario">
      <div className="flex flex-col min-h-[90vh] gap-10 justify-between">
        <div>
          <h2 className="text-center text-3xl mt-[40px]">Registrarse</h2>
          <div className="bg-[#D9D9D9] cursor-pointer mx-1 my-[50px] relative rounded h-[225px] text-center ">
            +
          </div>
          <div className="flex flex-col w-full items-center gap-5">
            <Input type="text" label="Documento" state="" setState={() => {}} />
            <Input type="text" label="Numero de telefono" state="" setState={() => {}} />
          </div>
        </div>
        <div className="flex w-full justify-end px-10">
          <PrimaryButton text="CONTINUAR" />
        </div>
      </div>
    </Layout>
  );
};

export default OwnerRegister;
