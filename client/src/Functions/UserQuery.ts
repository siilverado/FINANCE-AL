import store from '../App/Store';
import { setUser } from '../App/userSlice';
import type User from '../types/User.type';

import axios from './axios';

interface QueryResponse {
  error?: string;
  user?: User;
  token?: string;
}
interface RegisterBody {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPass: string;
}

export async function registerUser(body: RegisterBody) {
  try {
    const query: QueryResponse = await axios.post('/users/register', body);

    if (query.error) throw new Error(query.error);

    if (query.user) store.dispatch(setUser(query.user));
    if (query.token) localStorage.setItem('token', query.token);
  } catch (error) {
    console.log(error);
  }
}

interface LoginBody {
  mail: string;
  password: string;
}

export async function loginUser(body: LoginBody) {
  try {
    const query: QueryResponse = await axios.post('/user/login', body);

    if (query.error) throw new Error(query.error);

    if (query.user) store.dispatch(setUser(query.user));
    if (query.token) localStorage.setItem('token', query.token);
  } catch (error) {
    console.log(error);
  }
}

export async function authUser(): Promise<void> {
  const token = localStorage.getItem('token') ?? false;

  if (!token) {
    window.location.pathname = '/';
    return;
  }

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
