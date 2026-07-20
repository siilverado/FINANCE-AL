import axios from './axios';
import { refreshToken } from './utils';

interface ownerRegisterProps {
  phone: string;
  document: string;
}
interface dataType {
  data: unknown[] | { error: string };
}

export async function OwnerRegisterQuery(props: ownerRegisterProps) {
  const { phone, document } = props;
  const body = {
    DNI: document,
    phone,
    address: 'hola',
  };

  try {
    const { data }: dataType = await axios.post('/owner', body);

    if (!Array.isArray(data) && data.error) throw new Error(`Error: data.error = ${data.error}`);

    await refreshToken();

    return data;
  } catch (error) {
    console.log(error);
  }
}

interface SportFieldProps {
  name: string;
  sport: string;
  fieldType: string;
  dimensions: string;
  capacity: string | number;
}

export async function OwnerAddSFQuery(props: SportFieldProps) {
  try {
    props.capacity = Number(props.capacity);
    const { data }: dataType = await axios.post('/sportfields', { ...props });

    if (!Array.isArray(data) && data.error) throw new Error(`Error: data.error = ${data.error}`);

    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function OwnerEditSFQuery(props: SportFieldProps, id: string) {
  try {
    props.capacity = Number(props.capacity);
    const { data }: dataType = await axios.patch(`/sportfields/${id}`, props);

    if (!Array.isArray(data) && data.error) throw new Error(`Error: data.error = ${data.error}`);

    return data;
  } catch (error) {
    console.log(error);
  }
}
