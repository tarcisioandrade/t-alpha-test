import { instance } from '@/lib/instance-axios';
import { User } from '@/types/User';

export async function createUserAsync(input: User) {
  return await instance.post('/api/auth/register', input);
}
