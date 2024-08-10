import { instance } from '@/lib/instance-axios';
import { User } from '@/types/User';
import { UserLogin } from '@/types/User';
import Cookies from 'js-cookie';

export async function createUserAsync(input: User) {
  return await instance.post('/auth/register', input);
}

export async function signinUserAsync(input: UserLogin) {
  const res = await instance.post('/auth/login', input);
  return res.data;
}

export function isAuthenticate() {
  return !!Cookies.get('access_token');
}

export function logout() {
  Cookies.remove('access_token');
}
