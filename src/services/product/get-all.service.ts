import { instance } from '@/lib/instance-axios';
import { Product } from '@/types/Product';
import { Response } from '@/types/Response';

export async function getAllProductAsync() {
  const res = await instance.get<Response<{ products: Product[] }>>('/products/get-all-products');
  return res.data;
}
