interface Owner {
  DNI: string;
  address: string;
  phone: string;
}

export default interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image?: string;
  owner?: Owner;
}
