import client from '../axios';

export const refreshToken = async () => {
  try {
    const res = await client.get<string>('auth/refresh');

    const { data: token } = res;

    localStorage.setItem('token', token);
  } catch (e) {
    console.error(e);
  }
};
