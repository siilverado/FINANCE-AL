import { type FC, useState, type BaseSyntheticEvent, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { GiSoccerField } from 'react-icons/gi';
import { GrGroup } from 'react-icons/gr';
import { MdTitle } from 'react-icons/md';
import Swal from 'sweetalert2';

import Input from '../../Components/inputs/Input';
import Select from '../../Components/inputs/Select';
import Layout from '../../Components/layout/Layout';
import PrimaryButton from '../../Components/PrimaryButton';
import { PostFile } from '../../Functions/FileQuery';
import { OwnerAddSFQuery, OwnerEditSFQuery } from '../../Functions/OwnerQuery';
import { getSportDetail } from '../../Functions/SportFieldsQuery';
import { type appSport } from '../../types/App.type';
import { type ISportFieldRespones } from '../../types/SportField.type';
import { modifyObj } from '../../utils/modifyObj';
import { type inputData, type objectProp, validationInputs } from '../../utils/validationInputs';

import { RiImageAddFill } from 'react-icons/ri';

interface Props {
  edit?: boolean;
}

interface stateType {
  [key: string]: inputData;
  name: inputData;
  fieldType: inputData;
  sport: inputData;
  dimensions: inputData;
  capacity: inputData;
}

const AddSFOwner: FC<Props> = ({ edit = false }) => {
  const navigate = useNavigate();
  const { id = '' } = useParams();

  const defaultState: stateType = {
    name: { value: '', validation: true },
    fieldType: { value: '', validation: true, select: true },
    sport: { value: '', validation: true, select: true },
    dimensions: { value: '', validation: true, select: true },
    capacity: { value: '', validation: true, select: true },
  };
  const [state, setState] = useState<stateType | objectProp>(defaultState);

  const [imageSF, setImageSF] = useState('');
  const [imageRender, setImageRender] = useState<string | ArrayBuffer>('');
  const [file, setFile] = useState<null | File>(null);

  const handleFile = (e: BaseSyntheticEvent) => {
    setFile(e.target.files[0]);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        reader.result && setImageRender(reader.result);
      };
    } else {
      setImageRender('');
    }
  };

  const sportInfo = useSelector((state: appSport) => state.sport.sport);
  const sportNames = sportInfo?.map((item) => item.name);
  const sportFields = sportInfo?.find((item) => item.name === state.sport.value);

  const handleChange = (event: BaseSyntheticEvent) => {
    setState((prev) => {
      const target = event.target;
      const name = target.name;
      return {
        ...prev,
        [name]: { ...state[name], value: target.value },
      };
    });
  };

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    const { newState, pass } = validationInputs({ ...state }, 3);
    setState(newState);
    if (!pass) return;

    const body = {
      ...state,
    };

    const newObj = modifyObj({ ...body });

    if (!file && !imageSF) throw new Error(`Error: file es null y no hay imagen guardada`);
    const image = file ? await PostFile(file) : imageSF;
    if (!image) throw new Error('No se pudo guardar la imagen');
    const ObjWithImg = { ...newObj, images: [image] };

    if (edit) {
      void OwnerEditSFQuery(ObjWithImg, id).then((data) => {
        const datos = { ...data } as ISportFieldRespones;
        if (datos.id && datos.name && datos.fieldType && datos.sport) {
          toast.success(`${datos.name}, se actualizo correctamente.`, {
            style: {
              background: '#F5F5F5',
              color: '#4CAF50',
            },
          });
          return setTimeout(() => navigate('/propietarios'), 2000);
        }
        Swal.fire({
          title: 'Error!',
          text: 'No se ha podido registrar.',
          footer: '<b>Tip:</b> &nbsp Recuerde todos los campos son obligatorios.',
          icon: 'error',
          // Confirm Button
          showConfirmButton: true,
          confirmButtonText: 'Volver a Propietarios',
          confirmButtonColor: '#4CAF50',
          // Cancel Button
          showCancelButton: true,
          cancelButtonText: 'Intentar otra vez',
        })
          .then((response) => {
            if (response.isConfirmed) return navigate('/propietarios');
          })
          .catch((err) => console.log(err));
      });
      return;
    }

    OwnerAddSFQuery(ObjWithImg)
      .then((data) => {
        const datos = { ...data } as ISportFieldRespones;
        if (datos.id && datos.name && datos.fieldType && datos.sport) {
          toast.success(`${datos.name}, se registro correctamente.`, {
            style: {
              background: '#F5F5F5',
              color: '#4CAF50',
            },
          });
          return setTimeout(() => navigate('/propietarios'), 2000);
        }
        Swal.fire({
          title: 'Error!',
          text: 'No se ha podido registrar.',
          footer: '<b>Tip:</b> &nbsp Recuerde todos los campos son obligatorios.',
          icon: 'error',
          showConfirmButton: false,
          cancelButtonText: 'Intentar otra vez',
          showCancelButton: true,
          cancelButtonColor: '#4CAF50',
        }).catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (edit) {
      getSportDetail(id)
        .then((sportField) => {
          if (!sportField) return;
          const { name, fieldType, sport, dimensions, capacity, images } = sportField;
          setState({
            name: { value: name, validation: true },
            fieldType: { value: fieldType, validation: true, select: true },
            sport: { value: sport.name, validation: true, select: true },
            dimensions: { value: dimensions, validation: true, select: true },
            capacity: { value: `${capacity}`, validation: true, select: true },
          });
          setImageSF(images[0]);
        })
        .catch(console.error);
    }
  }, []);

  return (
    <Layout title="Agregar cancha">
      <form onSubmit={handleSubmit} className="relative min-h-[100vh] flex flex-col items-center">
        <input type="file" hidden id="ownerFiles" onChange={handleFile} />
        <label
          style={{
            backgroundImage: imageRender === '' ? `url(${imageSF})` : `url(${imageRender})`,
          }}
          htmlFor="ownerFiles"
          className="bg-[#D9D9D9] flex justify-center items-center gap-2 bg-no-repeat bg-cover rounded-lg w-10/12 cursor-pointer my-[70px] relative h-[225px] lg:h-[400px] lg:w-[600px] text-center "
        >
          <span className="text-lg font-bold opacity-50">Agregar imagen</span>
          <span className="text-4xl opacity-50">
            <RiImageAddFill />
          </span>
        </label>
        <div className="flex flex-col w-full items-center gap-10 lg:w-[700px]">
          <Input
            type="text"
            label="Nombre"
            icon={<MdTitle />}
            handleChange={handleChange}
            value={state.name.value}
            name={'name'}
            validation={state.name.validation}
          />
          <Select
            array={sportNames}
            label="Deporte"
            value={state.sport.value}
            handleClick={(option) =>
              setState((prev) => ({ ...prev, sport: { value: option, validation: true } }))
            }
            icon={<GiSoccerField />}
            anyOption={false}
            validation={state.sport.validation}
          />
          <Select
            array={sportFields?.types ?? []}
            label="Tipo de Cancha"
            value={state.fieldType.value}
            handleClick={(option) =>
              setState((prev) => ({ ...prev, fieldType: { value: option, validation: true } }))
            }
            anyOption={false}
            icon={<GiSoccerField />}
            validation={state.fieldType.validation}
          />
          <Input
            type="text"
            label="Dimensiones"
            icon={<GrGroup />}
            value={state.dimensions.value}
            handleChange={handleChange}
            name={'dimensions'}
            validation={state.dimensions.validation}
          />
          <Input
            type="number"
            label="Capacidad"
            icon={<GrGroup />}
            value={state.capacity.value}
            handleChange={handleChange}
            name={'capacity'}
            validation={state.capacity.validation}
          />
        </div>
        <div className="flex justify-end w-full pr-4 lg:px-60">
          <PrimaryButton text={edit ? 'GUARDAR' : 'CREAR'} />
        </div>
      </form>
    </Layout>
  );
};

export default AddSFOwner;
