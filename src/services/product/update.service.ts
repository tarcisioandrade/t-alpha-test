import { instance } from '@/lib/instance-axios';
import { Product } from '@/types/Product';

export async function updateProductAsync(product: Product) {
  const { id, ...rest } = product;
  const res = await instance.patch(`/products/update-product/${product.id}`, rest);
  return res.data;
}
