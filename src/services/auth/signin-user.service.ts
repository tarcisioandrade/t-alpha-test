import { instance } from '@/lib/instance-axios';
import { UserLogin } from '@/types/User';

export async function signinUserAsync(input: UserLogin) {
  const res = await instance.post('/api/auth/login', input);
  return res.data;
}
