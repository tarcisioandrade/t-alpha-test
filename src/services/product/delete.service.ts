import { instance } from "@/lib/instance-axios";

export async function deleteProductAsync(id: number) {
  const res = await instance.delete(`/products/delete-product/${id}`);
  return res.data;
}
