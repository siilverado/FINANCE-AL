import { type FC, useState, type BaseSyntheticEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { HiOutlineUser, HiUser } from 'react-icons/hi';
import { IoMdMail } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';

import Input from '../Components/inputs/Input';
import Layout from '../Components/layout/Layout';
import PrimaryButton from '../Components/PrimaryButton';
import { PostFile } from '../Functions/FileQuery';
import { updateUser } from '../Functions/UserQuery';
import { type AppUser } from '../types/App.type';
import { modifyObj } from '../utils/modifyObj';
import { type inputData, type objectProp, validationInputs } from '../utils/validationInputs';
import { toast } from 'react-hot-toast';

interface stateType {
  [key: string]: inputData;
  email: inputData;
  firstName: inputData;
  lastName: inputData;
}

const Profile: FC = () => {
  const userInfo = useSelector((state: AppUser) => state.user.user);
  const defaultState: stateType = {
    email: { value: userInfo?.email || '', validation: true },
    firstName: { value: userInfo?.firstName || '', validation: true },
    lastName: { value: userInfo?.lastName || '', validation: true },
  };
  const [state, setState] = useState<stateType | objectProp>(defaultState);

  const handleChange = (event: BaseSyntheticEvent) => {
    setState((prev) => {
      const target = event.target;
      return {
        ...prev,
        [target.name]: { value: target.value, validation: true },
      };
    });
  };

  const [image, setImage] = useState<string | ArrayBuffer>('');
  const [file, setFile] = useState<null | File>(null);

  const handleFile = (e: BaseSyntheticEvent) => {
    setFile(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        reader.result && setImage(reader.result);
      };
    } else {
      setImage(userInfo?.image ?? '');
    }
  };

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    try {
      e.preventDefault();

      const { newState, pass } = validationInputs({ ...state }, 3);
      setState(newState);
      if (!pass) return;

      if (!file && !userInfo.image) throw new Error(`Error: file es null y no hay imagen guardada`);
      const image = file ? await PostFile(file) : userInfo.image;

      if (!image) throw new Error('No se pudo guardar la imagen');
      const newObj = modifyObj({ ...state });
      await updateUser({ ...newObj, image }, userInfo.id).then(() =>
        toast.success('Cambios guardados exitosamente!', {
          style: {
            background: '#F5F5F5',
            color: '#4CAF50',
          },
        }),
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setState(defaultState);
    setFile(null);
    setImage(userInfo?.image ?? '');
  };

  useEffect(() => {
    setState(defaultState);
    setImage(userInfo?.image ?? '');
  }, [userInfo]);

  return (
    <Layout title="Perfil">
      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
        <input type="file" hidden id="fileId" onChange={handleFile} />
        <label
          style={{
            backgroundImage: `url(${image})`,
          }}
          htmlFor="fileId"
          className="group border-2 hover:border-none flex relative justify-center items-center bg-no-repeat bg-cover cursor-pointer w-36 h-36 rounded-full m-10 lg:m-20 lg:w-40 lg:h-40 lg:overflow-hidden"
        >
          <span className="hidden absolute w-full h-full rounded-full lg:group-hover:flex backdrop-blur-sm"></span>
          <MdEdit className="p-2 rounded-full box-content text-2xl bg-primary absolute bottom-0 right-0 lg:bg-[#fffa] border-2 lg:hidden lg:group-hover:flex lg:text-4xl lg:relative lg:border-0 lg:bg-[transparent]" />
        </label>
        <div className="w-full flex flex-col items-center gap-5 lg:w-5/12">
          <Input
            type="text"
            label="Nombre"
            handleChange={handleChange}
            name="firstName"
            value={state.firstName.value}
            icon={<HiOutlineUser />}
            validation={state.firstName.validation}
          />
          <Input
            type="text"
            label="Apellido"
            icon={<HiUser />}
            name="lastName"
            value={state.lastName.value}
            handleChange={handleChange}
            validation={state.lastName.validation}
          />
          <Input
            type="mail"
            label="Mail"
            icon={<IoMdMail />}
            handleChange={handleChange}
            name="email"
            value={state.email.value}
            validation={state.email.validation}
          />
        </div>
        <div className="flex w-10/12 justify-between absolute bottom-0 lg:relative lg:w-4/12 lg:m-10">
          <PrimaryButton text="CANCELAR" alternative={true} onClick={handleCancel} />
          <PrimaryButton text="GUARDAR" />
        </div>
      </form>
    </Layout>
  );
};

export default Profile;
