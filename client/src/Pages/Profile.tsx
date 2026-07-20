import { type FC, useState } from 'react';

import { MdEdit } from 'react-icons/md';

import Input from '../Components/Input';
import Layout from '../Components/Layout';
import PrimaryButton from '../Components/PrimaryButton';

const Profile: FC = () => {
  const [name, setName] = useState('Nayib');
  const [lastName, setLastName] = useState('Sales');
  const [mail, setMail] = useState('Nayib1@gmail.com');
  const [password, setPassword] = useState('Pepe');

  return (
    <Layout title="Perfil">
      <div className="flex flex-col items-center w-full relative min-h-[85vh]">
        <div className="bg-[#000] w-36 h-36 rounded-full m-10 lg:m-20 lg:w-40 lg:h-40"></div>
        <div className="w-full flex flex-col items-center gap-5 lg:w-5/12">
          <Input type="text" label="Nombre" state={name} setState={setName} icon={<MdEdit />} />
          <Input
            type="text"
            label="Apellido"
            state={lastName}
            setState={setLastName}
            icon={<MdEdit />}
          />
          <Input type="mail" label="Mail" state={mail} setState={setMail} icon={<MdEdit />} />
          <Input
            type="password"
            label="Contraseña"
            state={password}
            setState={setPassword}
            icon={<MdEdit />}
          />
        </div>
        <div className="flex w-10/12 justify-between absolute bottom-0 lg:relative lg:w-4/12 lg:m-10">
          <PrimaryButton text="CANCELAR" alternative={true} />
          <PrimaryButton text="GUARDAR" />
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
