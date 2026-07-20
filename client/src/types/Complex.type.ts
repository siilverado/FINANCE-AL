export default interface ComplexType {
  id?: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  grills: boolean;
  locker: boolean;
  lat: number;
  lng: number;
  showers: boolean;
  restobar: boolean;
  parking: boolean;
  owner?: any;
  availability: any[];
}
