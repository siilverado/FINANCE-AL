import store from '../App/Store';
import { setUser } from '../App/userSlice';
import type User from '../types/User.type';

import axios from './axios';

interface QueryResponse {
  data: {
    error?: string;
    user?: User;
    token?: string;
  };
}
interface RegisterBody {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export async function registerUser(body: RegisterBody) {
  try {
    const query: QueryResponse = await axios.post('/users/register', body);

    if (query.data.error) throw new Error(query.data.error);

    if (query.data.user) store.dispatch(setUser(query.data.user));
    if (query.data.token) localStorage.setItem('token', query.data.token);
    return query;
  } catch (error) {
    console.log(error);
  }
}

interface LoginBody {
  email: string;
  password: string;
}

export async function loginUser(body: LoginBody) {
  try {
    const query: QueryResponse = await axios.post('/users/login', body);

    if (query.data.error) throw new Error(query.data.error);

    if (query.data.user) store.dispatch(setUser(query.data.user));
    if (query.data.token) localStorage.setItem('token', query.data.token);
    return query;
  } catch (error) {
    console.log(error);
  }
}

export async function authUser(): Promise<void> {
  const token = localStorage.getItem('token') ?? false;

  if (!token) return;

  try {
    const query = await axios.get('/users/auth', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    store.dispatch(setUser(query.data));
    return;
  } catch (error) {
    localStorage.removeItem('token');
    console.log(error);
  }
}

interface updateUserBody {
  email: string;
  firstName: string;
  lastName: string;
  image: string;
}

export async function updateUser(body: updateUserBody, id: string) {
  try {
    const query: QueryResponse = await axios.patch(`/users/${id}`, body);
    if (query.data.error) throw new Error(query.data.error);
    query.data.user && store.dispatch(setUser(query.data.user));
    return query.data;
  } catch (error) {
    console.log(error);
  }
}
