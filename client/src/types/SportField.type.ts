import { type IReservation } from './Reservation.type';

export interface ISportField {
  id: string;
  name: string;
  description: string;
  dimensions: string;
  images: string[];
  sport: string;
  fieldType: string;
  reservation: IReservation[];
  capacity: number;
}

export interface ISportFieldRespones extends Omit<ISportField, 'dimensions'> {
  capacity: number;
  dimensions?: string;
  fieldType: string;
  sportsComplex: ISportComplex;
}

interface ISportComplex {
  address: string;
  email: string;
  id: string;
  iamges: string[];
  lat: number;
  lng: number;
  phone: string;
}
