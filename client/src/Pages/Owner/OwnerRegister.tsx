import { useState, type FC, type BaseSyntheticEvent } from 'react';
import toast from 'react-hot-toast';

import { AiOutlinePhone } from 'react-icons/ai';
import { HiOutlineIdentification } from 'react-icons/hi';
import Swal from 'sweetalert2';

import Input from '../../Components/inputs/Input';
import Layout from '../../Components/layout/Layout';
import PrimaryButton from '../../Components/PrimaryButton';
import { OwnerRegisterQuery } from '../../Functions/OwnerQuery';
import type RegisterResponse from '../../types/RegisterResponse.type';
import { modifyObj } from '../../utils/modifyObj';
import { type inputData, type objectProp, validationInputs } from '../../utils/validationInputs';

interface stateType {
  [key: string]: inputData;
  phone: inputData;
  document: inputData;
}

const OwnerRegister: FC = () => {
  const [state, setState] = useState<stateType | objectProp>({
    phone: { value: '', validation: true },
    document: { value: '', validation: true },
  });

  const handleChange = (event: BaseSyntheticEvent) => {
    setState((prev) => {
      const target = event.target;
      return {
        ...prev,
        [target.name]: { value: target.value, validation: true },
      };
    });
  };

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();

    const { newState, pass } = validationInputs({ ...state }, 3);
    setState(newState);
    if (!pass) return;

    const newObj = modifyObj({ ...state });

    OwnerRegisterQuery(newObj)
      .then((data) => {
        const datos = { ...data } as RegisterResponse;
        if (datos.id && datos.DNI && datos.phone) {
          toast.success(`${datos.firstName}! ya estas registrado como propietario`, {
            style: {
              background: '#F5F5F5',
              color: '#4CAF50',
            },
          });
          return setTimeout(() => window.location.reload(), 2000);
        }
        Swal.fire({
          title: 'Error!',
          text: 'No se ha podido registrar como Propietario.',
          footer: `<b>Tip:</b> &nbsp Recuerde todos los campos son obligatorios.`,
          icon: 'error',
          showConfirmButton: false,
          cancelButtonText: 'Intentar otra vez',
          showCancelButton: true,
          cancelButtonColor: '#4CAF50',
        }).catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <Layout title='Registro de propietario'>
      <form
        onSubmit={handleSubmit}
        className='relative min-h-[85vh] flex flex-col items-center justify-center'
      >
        <div className='flex flex-col w-full items-center gap-10 lg:w-[700px]'>
          <Input
            type='text'
            label='Documento'
            icon={<HiOutlineIdentification />}
            handleChange={handleChange}
            value={state.document.value}
            name={'document'}
            validation={state.document.validation}
          />
          <Input
            type='text'
            label='Numero de telefono'
            icon={<AiOutlinePhone />}
            handleChange={handleChange}
            value={state.phone.value}
            name={'phone'}
            validation={state.phone.validation}
          />
        </div>
        <div className='absolute bottom-0 right-10 lg:relative lg:my-10 lg:w-[675px] lg:flex lg:justify-end'>
          <PrimaryButton text='AGREGAR' />
        </div>
      </form>
    </Layout>
  );
};

export default OwnerRegister;
