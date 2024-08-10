import { instance } from '@/lib/instance-axios';
import { Product } from '@/types/Product';

export async function createProductAsync(product: Omit<Product, 'id'>) {
  const res = await instance.post(`/products/create-product`, product);
  return res.data;
}
