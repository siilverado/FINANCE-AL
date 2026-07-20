import { type GetReservationType } from '../types/Reservation.type';

import axios from './axios';

interface DataType {
  data: GetReservationType[];
}

export async function GetReservations() {
  try {
    const { data }: DataType = await axios.get('/sportfields/user/reservations');
    return data;
  } catch (err) {
    console.log(err);
  }
}

interface reservationData {
  sportfieldId: string;
  hour: number;
  date: string;
  userEmail: string;
}

export async function PostReservations(body: reservationData) {
  try {
    const { data } = await axios.post('/reservation', body);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function DeleteReservation(id: string) {
  try {
    const { data } = await axios.delete(`/reservation/${id}`);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function ReservationUser() {
  try {
    const { data }: DataType = await axios.get('/reservation');
    return data;
  } catch (err) {
    console.log(err);
  }
}
