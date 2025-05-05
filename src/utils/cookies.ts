import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setAuthToken = (token: string) => {
  cookies.set('authToken', token, {
    path: '/',
    secure: true,
    sameSite: 'strict',
  });
};

export const getAuthToken = (): string | undefined => {
  return cookies.get('authToken');
};

export const removeAuthToken = () => {
  cookies.remove('authToken', { path: '/' });
};
