import { type TurnType } from '../types/Turn.type';

import axios from './axios';

export async function GetTurns() {
  try {
    const { data } = await axios.get<TurnType[]>('/sportfields/owner/reservations');

    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function DeleteTurns({ id }: { id: string }) {
  try {
    const { data } = await axios.delete(`/reservation/${id}`);

    return data;
  } catch (err) {
    console.log(err);
  }
}
